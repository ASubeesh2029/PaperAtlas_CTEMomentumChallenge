# Paper Atlas Biotech
Developed for the Academy of Computer & Information Sciences (Morris County School of Technology)
Authors: Saatwik Koni & Kenji Keller

Interactive biotech career map (jobs, internships, colleges, certificates, summer work) with commute estimates, a quick-apply demo drawer, dark mode, and an AI career assistant.

## Files
- `index.html`: the whole site (home, map, commute modal, apply drawer)
- `chat.js` / `chat.css`: AI assistant panel
- `server.js`: tiny Node server that serves the site and talks to the AI (keeps your API key private)
- `logo.svg`: Paper Atlas logo

## Run it
1. Install Node 18+ (https://nodejs.org).
2. Copy `.env.example` to `.env` and put your API key in it.
3. In this folder run: `node server.js`
4. Open http://localhost:3000

Opening `index.html` directly still works for the map, but the AI chat needs the server (it shows offline suggestions otherwise).

## Using a different AI provider
Only the `fetch(...)` call inside `handleChat` in `server.js` is provider-specific. Swap the URL, headers, and the way the reply text is read.

## Security
The API key lives only in `.env` on the server. Never put it in `index.html` or `chat.js`, since anyone could read it in the browser.

## Put it online with Vercel (public link)
1. Make a GitHub repo with this folder (the `.gitignore` keeps `.env` out) or use the Vercel CLI.
2. At vercel.com click **Add New > Project**, import it, and name the project something neutral (the link will be `that-name.vercel.app`).
3. Before deploying, open **Environment Variables** and add `ANTHROPIC_API_KEY` with your key.
4. Deploy. The chat runs through `api/chat.js`; `server.js` is only for running on your own computer.
