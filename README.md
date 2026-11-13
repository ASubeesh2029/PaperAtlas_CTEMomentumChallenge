# Paper Atlas - Biotech Career Map
Academy of Computer & Information Sciences (Morris County School of Technology)
Authors: Saatwik Koni & Kenji Keller

## Run it
Open `index.html` in a browser for the map and offline assistant. The live AI only works once deployed on Vercel. The page is self-contained, so `script.js` and `styles.css` from the earlier version are no longer used.

## What changed in this update
1. **AI Assistant has its own tab.** Home | Interactive Map | AI Assistant. Quick-prompt buttons, and every answer includes "Show on map" chips.
2. **API key (Vercel).** The key is not in the website. The AI tab calls `/api/chat` (the file `api/chat.js`), which runs on Vercel and reads the key from an Environment Variable.
   - In Vercel: Project > Settings > Environment Variables > add `GEMINI_API_KEY` (your key from https://aistudio.google.com/apikey). Optional: `GEMINI_MODEL` (default `gemini-flash-latest`).
   - Redeploy after adding the variable. Keep the `api` folder next to `index.html` when uploading.
   - If the AI is unreachable (for example when opening the file locally), the assistant falls back to searching the listings.
3. **Detailed job summaries.** Every pin now has an overview, what you will do, requirements, pay/cost, schedule, skills and career path. These show in the map popup, the Details & Fast Apply drawer, the commute window, and on the Home cards.
4. **Pin locations fixed.** Pins were random offsets from city centers, so some landed in the ocean or the wrong town. Each pin is now anchored to a real campus or business district on land. Exact duplicate pins were removed, and the 16 Morris County listings from the earlier version were added back with corrected coordinates.

## Honest note for the presentation
All listings are sample data for a school project, not live job postings. Pay figures marked "estimate" are typical ranges. Confirm details with the employer or school before applying.
