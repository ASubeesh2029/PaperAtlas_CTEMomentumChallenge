// Paper Atlas server: serves the site and proxies chat to the AI API.
// The API key lives in .env on the server and is never sent to the browser.
// Requires Node 18+. No npm packages needed.
const http = require('http');
const fs = require('fs');
const path = require('path');

// Minimal .env loader (so no dependencies are needed)
try {
  for (const line of fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch (_) { /* no .env file */ }

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';

const SYSTEM = `You are the Paper Atlas assistant, a friendly career guide for high school students exploring biotech and life-sciences jobs, internships, summer work, certificates and colleges. The site focuses on Morris County, New Jersey but also maps opportunities nationwide.
Rules:
- Prefer the "map listings" provided in each request; recommend those by name. Never invent companies, pay, or openings that are not in them. If nothing fits, say so and suggest using the map search and filters.
- Keep answers short (under about 150 words), warm, and practical. Plain text only, no markdown.
- This site is a student project demo: listings may be illustrative, so remind students to confirm details with the employer or school when relevant.`;

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const PUBLIC = new Set(['index.html', 'chat.js', 'chat.css', 'logo.svg']); // only these are served

// very small per-IP rate limit: 20 requests / minute
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60000);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 20;
}

function json(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

async function handleChat(req, res) {
  if (!API_KEY) return json(res, 500, { error: 'Server has no API key. Add ANTHROPIC_API_KEY to the .env file.' });
  if (limited(req.socket.remoteAddress)) return json(res, 429, { error: 'Too many messages, slow down a bit.' });

  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 50000) return json(res, 413, { error: 'Request too large.' }); }
  let body;
  try { body = JSON.parse(raw); } catch { return json(res, 400, { error: 'Bad JSON.' }); }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json(res, 400, { error: 'No question received.' });

  const listings = JSON.stringify((Array.isArray(body.pins) ? body.pins : []).slice(0, 15));
  const origin = String(body.origin || '').slice(0, 80);
  const system = `${SYSTEM}\n\nStudent's starting location: ${origin || 'unknown'}\nMap listings relevant to this question (JSON): ${listings}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 500, system, messages }),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('AI API error:', r.status, data);
      return json(res, 502, { error: 'The AI service returned an error.' });
    }
    const reply = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
    json(res, 200, { reply: reply || "Sorry, I don't have an answer for that." });
  } catch (err) {
    console.error(err);
    json(res, 502, { error: 'Could not reach the AI service.' });
  }
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && url.pathname === '/api/chat') return handleChat(req, res);
  if (req.method !== 'GET') { res.writeHead(405); return res.end(); }
  const name = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  if (!PUBLIC.has(name)) { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(path.join(__dirname, name), (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Paper Atlas running at http://localhost:${PORT}`);
  if (!API_KEY) console.log('WARNING: no ANTHROPIC_API_KEY set. Chat will fall back to offline suggestions.');
});
