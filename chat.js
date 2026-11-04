/* Paper Atlas AI chat. Talks ONLY to our own /api/chat endpoint (server.js);
   the API key never appears in browser code. */
(function () {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const stream = document.getElementById('chatStream');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const quick = document.getElementById('chatQuick');
  if (!fab || !panel) return;

  const history = []; // {role: 'user'|'assistant', content}
  let busy = false;

  function add(cls, text) {
    const d = document.createElement('div');
    d.className = 'chat-msg ' + cls;
    d.textContent = text; // textContent: model output is never injected as HTML
    stream.appendChild(d);
    stream.scrollTop = stream.scrollHeight;
    return d;
  }

  function setOpen(open) {
    panel.hidden = !open;
    fab.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  }
  fab.addEventListener('click', () => setOpen(panel.hidden));
  document.getElementById('chatClose').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });

  add('ai', "Hi! I'm the Paper Atlas assistant. Ask me about biotech jobs, internships, colleges, or certificates, especially around Morris County, NJ.");

  // Send the model a few relevant pins from the map data so answers match what's on the site.
  function relevantPins(text) {
    const pins = window.atlasPins || [];
    const words = text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
    const score = (p) => {
      const hay = `${p.title} ${p.company} ${p.city} ${p.state} ${p.category} ${p.experience}`.toLowerCase();
      let s = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0);
      if (p.pay) s += 0.5; // hand-written local listings are the most useful
      return s;
    };
    return pins
      .map((p) => [score(p), p])
      .filter(([s]) => s > 0.5)
      .sort((a, b) => b[0] - a[0])
      .slice(0, 15)
      .map(([, p]) => ({
        title: p.title, company: p.company, location: `${p.city}, ${p.state}`,
        category: p.category, experience: p.experience, pay: p.pay || undefined, summary: p.summary || undefined,
      }));
  }

  // Basic offline fallback so the demo still works if the server isn't running.
  function fallbackReply(text) {
    const hits = relevantPins(text).slice(0, 4);
    if (!hits.length) return "I couldn't reach the AI server, and I couldn't find a matching pin. Try the search box on the map.";
    return "The AI server isn't reachable right now, but these map pins match your question:\n" +
      hits.map((h) => `• ${h.title} at ${h.company} (${h.location})`).join('\n');
  }

  async function send(text) {
    if (busy || !text) return;
    busy = true; sendBtn.disabled = true;
    quick.style.display = 'none';
    add('user', text);
    history.push({ role: 'user', content: text });
    const typing = add('ai typing', 'Thinking...');
    try {
      const origin = (document.getElementById('user-origin-input') || {}).value || '';
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-12), origin, pins: relevantPins(text) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);
      typing.remove();
      add('ai', data.reply);
      history.push({ role: 'assistant', content: data.reply });
    } catch (err) {
      typing.remove();
      history.pop(); // don't keep the failed turn in history
      add('err', 'Could not get an AI answer. ' + (err.message || '')); 
      add('ai', fallbackReply(text));
    } finally {
      busy = false; sendBtn.disabled = false; input.focus();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = input.value.trim();
    input.value = '';
    send(t);
  });
  quick.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => { setOpen(true); send(b.dataset.q); })
  );
})();
