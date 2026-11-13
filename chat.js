// Vercel serverless function: POST /api/chat
// The Gemini key is read from the Vercel Environment Variable GEMINI_API_KEY
// (Project > Settings > Environment Variables). It never reaches the browser.

const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';

const SYSTEM = (origin, listings) => `You are the Paper Atlas AI Navigator, a friendly career guide for high school students exploring biotech careers (jobs, internships, certificates, university programs, summer work).
Rules:
- Recommend ONLY from the LISTINGS below when you name specific opportunities. If none fit, say so and suggest how to refine the search.
- These are sample listings for a school project, not verified postings. Remind the student to confirm details with the employer or school before applying.
- Pay figures marked as estimates are estimates. Do not invent exact salaries, deadlines, or application links.
- The student's starting location is ${origin}. Mention distance when it helps.
- Keep answers short (under 170 words), clear, and encouraging. Use short bullet points when listing options.

LISTINGS:
${listings || '(no listings matched this question)'}`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY is not set in Vercel.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const question = String(body.question || '').slice(0, 500);
  if (!question.trim()) return res.status(400).json({ error: 'Empty question.' });
  const origin = String(body.origin || 'Denville, NJ').slice(0, 80);
  const listings = String(body.listings || '').slice(0, 6000);
  const history = (Array.isArray(body.history) ? body.history : []).slice(-8).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: String(m.text || '').slice(0, 1500) }]
  }));

  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM(origin, listings) }] },
        contents: [...history, { role: 'user', parts: [{ text: question }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 700 }
      })
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ error: (data.error && data.error.message) || `Gemini error ${r.status}` });
    const parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
    const text = parts ? parts.map(p => p.text || '').join('').trim() : '';
    if (!text) return res.status(502).json({ error: 'Empty answer from Gemini.' });
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach Gemini.' });
  }
};
