/* ==========================================================================
   PAPER ATLAS — EXPANDED DATASET & INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const defaultCenter = [40.8584, -74.4312]; // Morris County, NJ
  const defaultZoom = 12;

  // Initialize Leaflet Map Engine
  const map = L.map('map', { zoomControl: false }).setView(defaultCenter, defaultZoom);

  // Modern Clean Tile Layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Paper Atlas | OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Zoom Controls
  document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());
  document.getElementById('reset-view').addEventListener('click', () => map.setView(defaultCenter, defaultZoom));

  // EXPANDED DATASET: Packed with 18+ Real & Realistic Locations Across NJ
  const opportunities = [
    {
      id: "lakeview-pharma",
      company: "Lakeview Pharmaceuticals",
      openingsCount: 2,
      lat: 40.8620,
      lng: -74.4250,
      category: "internship",
      color: "#6F9BB8", // Dusty Blue (#6F9BB8)
      icon: "fa-id-badge",
      jobs: [
        {
          title: "Lab Assistant Intern",
          experience: "No experience required",
          pay: "$18.50 / hr",
          location: "Morris Plains, NJ",
          summary: "Prepare laboratory samples, keep detailed testing records, and maintain equipment logs.",
          requirements: ["High school diploma or active senior status.", "Attention to detail.", "Basic computer literacy."]
        },
        {
          title: "Quality Control Helper",
          experience: "Entry level experience required",
          pay: "$19.75 / hr",
          location: "Morris Plains, NJ",
          summary: "Assist senior chemists with product check protocols and documentation logs.",
          requirements: ["High school chemistry or biology coursework.", "Good communication."]
        }
      ]
    },
    {
      id: "biotech-innovations",
      company: "BioTech Innovations Lab",
      openingsCount: 1,
      lat: 40.8490,
      lng: -74.4480,
      category: "job",
      color: "#E3B04B", // Muted Mustard (#E3B04B)
      icon: "fa-briefcase",
      jobs: [
        {
          title: "Biomanufacturing Junior Tech",
          experience: "Entry level",
          pay: "$22.50 / hr",
          location: "Denville, NJ",
          summary: "Monitor bioreactor conditions, sterilize equipment, and log daily research metrics.",
          requirements: ["Vocational certificate or high school diploma.", "Interest in bio-manufacturing."]
        }
      ]
    },
    {
      id: "morris-science-inst",
      company: "Morris Science Institute",
      openingsCount: 1,
      lat: 40.8710,
      lng: -74.4100,
      category: "certificate",
      color: "#7FA37A", // Sage Green (#7FA37A)
      icon: "fa-award",
      jobs: [
        {
          title: "Clinical Trial Research Assistant Cert",
          experience: "No experience required",
          pay: "Tuition Sponsored",
          location: "Randolph, NJ",
          summary: "8-week intensive hands-on training preparing graduates for clinical trial operations.",
          requirements: ["High school diploma or GED."]
        }
      ]
    },
    {
      id: "ecolife-labs",
      company: "EcoLife Research Labs",
      openingsCount: 1,
      lat: 40.8410,
      lng: -74.4180,
      category: "summer",
      color: "#D9825B", // Soft Terracotta (#D9825B)
      icon: "fa-sun",
      jobs: [
        {
          title: "Summer Environmental Bio-Aide",
          experience: "No experience required",
          pay: "$17.50 / hr",
          location: "Parsippany, NJ",
          summary: "Collect soil and aquatic biological samples across research locations in Morris County.",
          requirements: ["Enthusiasm for outdoor bio-research.", "Dependable team player."]
        }
      ]
    },
    {
      id: "fairleigh-dickinson",
      company: "Fairleigh Dickinson University",
      openingsCount: 1,
      lat: 40.7820,
      lng: -74.4420,
      category: "college",
      color: "#8C7AA8", // Muted Plum (#8C7AA8)
      icon: "fa-graduation-cap",
      jobs: [
        {
          title: "BS in Life Sciences & Biotech",
          experience: "Post-Secondary Opportunity",
          pay: "Financial Aid Available",
          location: "Madison, NJ",
          summary: "4-year undergraduate degree program featuring guaranteed laboratory industry internships.",
          requirements: ["High school transcript submission."]
        }
      ]
    },
    {
      id: "novartis-campus",
      company: "Novartis Biomedical Hub",
      openingsCount: 2,
      lat: 40.8125,
      lng: -74.4012,
      category: "internship",
      color: "#6F9BB8",
      icon: "fa-id-badge",
      jobs: [
        {
          title: "High School STEM Research Scholar",
          experience: "No experience required",
          pay: "$20.00 / hr",
          location: "East Hanover, NJ",
          summary: "Work alongside senior molecular biologists in active cellular research labs.",
          requirements: ["Enrolled in 11th or 12th grade.", "STEM recommendation."]
        }
      ]
    },
    {
      id: "bayer-healthcare",
      company: "Bayer Consumer Health US",
      openingsCount: 1,
      lat: 40.8250,
      lng: -74.4680,
      category: "job",
      color: "#E3B04B",
      icon: "fa-briefcase",
      jobs: [
        {
          title: "Sample Inventory Coordinator",
          experience: "Entry level",
          pay: "$21.00 / hr",
          location: "Whippany, NJ",
          summary: "Log biomedical testing samples into database systems and organize cold-storage vaults.",
          requirements: ["High school diploma.", "Strong organizational skills."]
        }
      ]
    },
    {
      id: "ccm-biotech",
      company: "County College of Morris - Bio Dept",
      openingsCount: 1,
      lat: 40.8655,
      lng: -74.5688,
      category: "college",
      color: "#8C7AA8",
      icon: "fa-graduation-cap",
      jobs: [
        {
          title: "AS in Biotechnology Degree",
          experience: "Post-Secondary Pathway",
          pay: "Affordable In-County Tuition",
          location: "Randolph, NJ",
          summary: "2-year associate degree program directly linked with local pharmaceutical job placements.",
          requirements: ["Open admission for HS graduates."]
        }
      ]
    },
    {
      id: "atlantic-health",
      company: "Morristown Medical Center Research",
      openingsCount: 2,
      lat: 40.7915,
      lng: -74.4660,
      category: "job",
      color: "#E3B04B",
      icon: "fa-briefcase",
      jobs: [
        {
          title: "Clinical Specimen Processor",
          experience: "Entry level",
          pay: "$20.50 / hr",
          location: "Morristown, NJ",
          summary: "Receive, centrifuge, and catalog biological specimens for hospital laboratory analysis.",
          requirements: ["High school diploma or equivalent.", "Shift flexibility."]
        }
      ]
    },
    {
      id: "drew-university",
      company: "Drew University Science Center",
      openingsCount: 1,
      lat: 40.7610,
      lng: -74.4250,
      category: "summer",
      color: "#D9825B",
      icon: "fa-sun",
      jobs: [
        {
          title: "RISE Summer Bio Apprentice",
          experience: "No experience required",
          pay: "$18.00 / hr",
          location: "Madison, NJ",
          summary: "Participate in hands-on summer research guided by retired industrial scientists.",
          requirements: ["Interest in biological research."]
        }
      ]
    },
    {
      id: "genewiz-azenta",
      company: "Azenta Life Sciences (GENEWIZ)",
      openingsCount: 1,
      lat: 40.5480,
      lng: -74.6050,
      category: "job",
      color: "#E3B04B",
      icon: "fa-briefcase",
      jobs: [
        {
          title: "DNA Sequencing Lab Aide",
          experience: "Entry level",
          pay: "$21.50 / hr",
          location: "South Plainfield, NJ",
          summary: "Prepare genomic reaction plates and run automated capillary electrophoresis instruments.",
          requirements: ["High school diploma.", "Basic lab safety knowledge."]
        }
      ]
    },
    {
      id: "sanofi-hub",
      company: "Sanofi US Headquarters",
      openingsCount: 2,
      lat: 40.6980,
      lng: -74.6320,
      category: "internship",
      color: "#6F9BB8",
      icon: "fa-id-badge",
      jobs: [
        {
          title: "Biomanufacturing Quality Trainee",
          experience: "No experience required",
          pay: "$19.50 / hr",
          location: "Bridgewater, NJ",
          summary: "Inspect sterile packaging lines and assist quality auditors with batch record entries.",
          requirements: ["Active high school senior or recent grad."]
        }
      ]
    },
    {
      id: "roche-nutley",
      company: "ON3 BioTech Innovation Campus",
      openingsCount: 1,
      lat: 40.8210,
      lng: -74.1480,
      category: "certificate",
      color: "#7FA37A",
      icon: "fa-award",
      jobs: [
        {
          title: "Cleanroom Tech Certification",
          experience: "No experience required",
          pay: "Sponsored Training Stipend",
          location: "Nutley, NJ",
          summary: "4-week hands-on certification course covering gowning procedures and cleanroom protocols.",
          requirements: ["HS Diploma or GED."]
        }
      ]
    },
    {
      id: "johnson-johnson",
      company: "Johnson & Johnson Innovation Hub",
      openingsCount: 1,
      lat: 40.4980,
      lng: -74.4450,
      category: "internship",
      color: "#6F9BB8",
      icon: "fa-id-badge",
      jobs: [
        {
          title: "Medical Device Assembly Intern",
          experience: "No experience required",
          pay: "$19.00 / hr",
          location: "New Brunswick, NJ",
          summary: "Assemble surgical diagnostic instruments under sterile micro-assembly conditions.",
          requirements: ["Good dexterity and focus."]
        }
      ]
    },
    {
      id: "rutgers-biotech",
      company: "Rutgers Center for Advanced Biotechnology",
      openingsCount: 1,
      lat: 40.5220,
      lng: -74.4620,
      category: "college",
      color: "#8C7AA8",
      icon: "fa-graduation-cap",
      jobs: [
        {
          title: "BS in Bio-Molecular Engineering",
          experience: "Post-Secondary Pathway",
          pay: "Scholarships Available",
          location: "Piscataway, NJ",
          summary: "Premier state university program with state-of-the-art bio-foundry research labs.",
          requirements: ["High school application."]
        }
      ]
    }
  ];

  function createCustomPin(color, iconClass) {
    return L.divIcon({
      className: 'custom-pin-wrapper',
      html: `<div class="custom-pin-card" style="background-color: ${color};">
               <i class="fa-solid ${iconClass}"></i>
             </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -32]
    });
  }

  // Render Opportunity Cards
  const jobsGrid = document.getElementById('jobs-grid');

  function renderJobCards(dataset) {
    jobsGrid.innerHTML = '';
    dataset.forEach(opp => {
      opp.jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
          <div>
            <span class="card-category-badge" style="background-color: ${opp.color};">${opp.category}</span>
            <h3 class="card-job-title">${job.title}</h3>
            <div class="card-company-name">${opp.company}</div>
            
            <div class="card-meta-info">
              <div><i class="fa-solid fa-briefcase"></i> ${job.experience}</div>
              <div><i class="fa-solid fa-location-dot"></i> ${job.location}</div>
              <div><i class="fa-solid fa-dollar-sign"></i> ${job.pay}</div>
            </div>
            
            <p class="card-summary-text">${job.summary}</p>
          </div>

          <div class="card-buttons-group">
            <button class="btn-card-details" onclick="openJobModal('${opp.company}', '${job.title}', '${job.experience}', '${job.pay}', '${job.location}', \`${job.summary}\`, '${opp.category}')">
              <i class="fa-solid fa-circle-info"></i> View Details
            </button>
            <button class="btn-card-locate" onclick="focusOnMap(${opp.lat}, ${opp.lng})">
              <i class="fa-solid fa-map-pin"></i> Pin Map
            </button>
          </div>
        `;
        jobsGrid.appendChild(card);
      });
    });
  }

  // Render Map Markers — store refs by ID for AI highlighting
  const markersGroup = L.layerGroup().addTo(map);
  const markerRefs   = {}; // id → { marker, opp }

  function renderMapMarkers(dataset) {
    markersGroup.clearLayers();
    Object.keys(markerRefs).forEach(k => delete markerRefs[k]);

    dataset.forEach(opp => {
      const marker = L.marker([opp.lat, opp.lng], {
        icon: createCustomPin(opp.color, opp.icon)
      });

      let popupHTML = `
        <div class="popup-inner">
          <div class="popup-heading">${opp.company}</div>
          <div style="font-size: 0.85rem; color: #57606A; margin-bottom: 6px;">${opp.openingsCount} Position(s) Nearby</div>
      `;

      opp.jobs.forEach(job => {
        popupHTML += `
          <div class="popup-item-row">
            <div>
              <strong style="font-size: 0.95rem;">${job.title}</strong>
              <div style="font-size: 0.8rem; color: #57606A;">${job.experience}</div>
            </div>
            <button class="btn-popup-info" onclick="openJobModal('${opp.company}', '${job.title}', '${job.experience}', '${job.pay}', '${job.location}', \`${job.summary}\`, '${opp.category}')">
              Details
            </button>
          </div>
        `;
      });

      popupHTML += `</div>`;
      marker.bindPopup(popupHTML);
      markersGroup.addLayer(marker);
      markerRefs[opp.id] = { marker, opp };
    });
  }

  // ── AI Map Controls ──────────────────────────────────────────
  // Called by the AI chat to pulse + zoom to recommended locations
  function highlightOpportunities(ids) {
    if (!ids || ids.length === 0) return;
    const validIds = ids.filter(id => markerRefs[id]);
    if (validIds.length === 0) return;

    // Dim all markers first
    Object.entries(markerRefs).forEach(([id, ref]) => {
      const el = ref.marker.getElement();
      if (el) el.style.opacity = validIds.includes(id) ? '1' : '0.2';
    });

    // Pulse-highlight the recommended ones
    validIds.forEach(id => {
      const el = markerRefs[id].marker.getElement();
      if (el) {
        el.classList.remove('ai-map-pulse');
        void el.offsetWidth; // force reflow to restart animation
        el.classList.add('ai-map-pulse');
      }
    });

    // Zoom map to fit all highlighted markers
    const points = validIds.map(id => [markerRefs[id].opp.lat, markerRefs[id].opp.lng]);
    if (points.length === 1) {
      map.setView(points[0], 14, { animate: true });
    } else {
      map.fitBounds(L.latLngBounds(points).pad(0.25), { animate: true });
    }

    // Auto-reset dim after 8 seconds
    setTimeout(resetMapHighlights, 8000);
  }

  function resetMapHighlights() {
    Object.values(markerRefs).forEach(ref => {
      const el = ref.marker.getElement();
      if (el) {
        el.style.opacity = '1';
        el.classList.remove('ai-map-pulse');
      }
    });
  }

  renderJobCards(opportunities);
  renderMapMarkers(opportunities);

  window.focusOnMap = (lat, lng) => {
    map.setView([lat, lng], 14, { animate: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Filter Engine
  const searchInput = document.getElementById('job-search');
  const categoryFilter = document.getElementById('filter-category');
  const experienceFilter = document.getElementById('filter-experience');

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const cat = categoryFilter.value.toLowerCase();
    const exp = experienceFilter.value.toLowerCase();

    const filtered = opportunities.filter(opp => {
      const matchesCategory = !cat || opp.category === cat;
      const matchesQuery = !query || opp.company.toLowerCase().includes(query) || 
        opp.jobs.some(j => j.title.toLowerCase().includes(query) || j.summary.toLowerCase().includes(query) || j.location.toLowerCase().includes(query));
      const matchesExp = !exp || opp.jobs.some(j => j.experience.toLowerCase().includes(exp));

      return matchesCategory && matchesQuery && matchesExp;
    });

    renderJobCards(filtered);
    renderMapMarkers(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);
  experienceFilter.addEventListener('change', applyFilters);

  document.getElementById('clear-search').addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = '';
    experienceFilter.value = '';
    applyFilters();
  });

  // Modal Handlers
  const modal = document.getElementById('job-modal');
  const modalClose = document.getElementById('modal-close');
  const modalDismiss = document.getElementById('modal-dismiss');

  window.openJobModal = (company, title, experience, pay, location, summary, category) => {
    document.getElementById('modal-company').textContent = company;
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-experience').textContent = experience;
    document.getElementById('modal-pay').textContent = pay;
    document.getElementById('modal-location').textContent = location;
    document.getElementById('modal-summary').textContent = summary;
    document.getElementById('modal-category').textContent = category.toUpperCase();

    modal.classList.add('active');
  };

  [modalClose, modalDismiss].forEach(btn => {
    btn.addEventListener('click', () => modal.classList.remove('active'));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.getElementById('modal-btn-route').addEventListener('click', () => {
    modal.classList.remove('active');
    document.getElementById('transit-section').scrollIntoView({ behavior: 'smooth' });
  });

  // ============================================================
  //  AI Career Assistant — Powered by Gemini 2.0 Flash (Google AI)
  //  PUT YOUR API KEY HERE ↓
  // ============================================================
  const GEMINI_API_KEY = "AQ.Ab8RN6KoQ08cR03hUOr3O-d2_T7F5M60tUZ-2x6jQ6IZZB6rRA";

  const ACTIVE_MODEL = "gemini-3.5-flash-lite";

  function makeApiUrl(model) {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;
  }

  // Conversation history — capped at 6 messages (3 turns) to keep context small & fast
  const chatHistory = [];
  const MAX_HISTORY = 6;

  // Build a compact system prompt — shorter prompt = faster first token
  function buildSystemPrompt() {
    // Condensed job list: one line per opportunity
    const oppList = opportunities.map(opp =>
      `[${opp.id}] ${opp.company} | ${opp.category} | ${opp.jobs.map(j => `${j.title} ${j.pay}`).join(', ')} | ${opp.jobs[0].location}`
    ).join('\n');

    return `You are Paper Atlas AI — a brief, friendly NJ life-sciences career assistant.
Help students find jobs, internships, certificates, and colleges in Morris County NJ.
Reply in ≤80 words. Use short bullet points. Always include pay & location.
When recommending specific places, append exactly: [HIGHLIGHT:id1,id2] (invisible to user, drives the map).
JOBS:\n${oppList}`;
  }

  // ── Chat UI helpers ──────────────────────────────────────────
  const chatInput   = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatStream  = document.getElementById('chat-stream');

  window.usePrompt = (text) => {
    chatInput.value = text;
    handleSendChat();
  };

  function appendChatMsg(sender, htmlContent) {
    const row = document.createElement('div');
    row.className = `chat-row ${sender}-row`;
    row.innerHTML = `
      <div class="bot-icon"><i class="fa-solid ${sender === 'ai' ? 'fa-robot' : 'fa-user'}"></i></div>
      <div class="chat-bubble">
        <strong>${sender === 'ai' ? 'Paper Atlas AI Navigator' : 'You'}</strong>
        <p>${htmlContent}</p>
      </div>
    `;
    chatStream.appendChild(row);
    chatStream.scrollTop = chatStream.scrollHeight;
    return row;
  }

  /** Creates a streaming AI bubble and returns a ref to its <p> element */
  function createStreamingBubble() {
    const row = document.createElement('div');
    row.className = 'chat-row ai-row';
    row.innerHTML = `
      <div class="bot-icon"><i class="fa-solid fa-robot"></i></div>
      <div class="chat-bubble">
        <strong>Paper Atlas AI Navigator</strong>
        <p class="ai-stream-text"><span class="typing-cursor">▋</span></p>
      </div>
    `;
    chatStream.appendChild(row);
    chatStream.scrollTop = chatStream.scrollHeight;
    return row.querySelector('.ai-stream-text');
  }

  async function handleSendChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    chatInput.disabled = true;
    chatSendBtn.disabled = true;

    appendChatMsg('user', escapeHtml(text));
    chatHistory.push({ role: 'user', parts: [{ text }] });

    // ── Cap history to last MAX_HISTORY messages (keeps tokens low & speed high)
    while (chatHistory.length > MAX_HISTORY) chatHistory.shift();

    const body = {
      system_instruction: { parts: [{ text: buildSystemPrompt() }] },
      contents: chatHistory,
      generationConfig: {
        temperature: 0.4,      // lower = less "thinking" = faster
        maxOutputTokens: 250,  // short snappy answers
        topP: 0.8,
        topK: 20
      }
    };

    const streamP = createStreamingBubble();
    let fullText = '';

    try {
      const response = await fetch(makeApiUrl(ACTIVE_MODEL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${response.status}`);
      }

      // Read SSE stream — batch renders with rAF to avoid layout thrashing
      const reader  = response.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = '';
      let   rafPending = false;
      let   isStreamDone = false;

      const flushRender = () => {
        if (isStreamDone) return;
        streamP.innerHTML = formatAiMarkdown(fullText) + '<span class="typing-cursor">▋</span>';
        chatStream.scrollTop = chatStream.scrollHeight;
        rafPending = false;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;
          try {
            const chunk = JSON.parse(jsonStr);
            const piece = chunk?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
            if (piece) {
              fullText += piece;
              // Batch DOM updates — only repaint once per animation frame
              if (!rafPending) {
                rafPending = true;
                requestAnimationFrame(flushRender);
              }
            }
          } catch (_) { /* skip partial JSON */ }
        }
      }

      isStreamDone = true;

      // ── Parse HIGHLIGHT tag and drive the map ─────────────────
      const highlightMatch = fullText.match(/\[HIGHLIGHT:([^\]]+)\]/);
      if (highlightMatch) {
        const ids = highlightMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        highlightOpportunities(ids);

        // Show a small interactive map nudge in the chat
        const mapPill = document.createElement('div');
        mapPill.className = 'ai-map-pill';
        mapPill.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> View ${ids.length} highlighted location${ids.length > 1 ? 's' : ''} on map ↑`;
        mapPill.title = "Click to center and view highlighted locations";
        mapPill.onclick = () => {
          highlightOpportunities(ids);
          document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
        };
        streamP.parentElement.appendChild(mapPill);
      }

      // Final render (clean, no cursor, no tag, formatted markdown)
      streamP.innerHTML = formatAiMarkdown(fullText) || '(No response)';

      chatHistory.push({ role: 'model', parts: [{ text: fullText }] });

    } catch (err) {
      streamP.innerHTML = `⚠️ <strong>Error:</strong> ${escapeHtml(err.message)}`;
      chatHistory.pop();
    }

    chatInput.disabled = false;
    chatSendBtn.disabled = false;
    chatInput.focus();
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function formatAiMarkdown(raw) {
    let clean = raw.replace(/\[HIGHLIGHT:[^\]]*\]/g, '').trim();
    if (!clean) return '';
    let escaped = escapeHtml(clean);
    // Bold: **text** -> <strong>text</strong>
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Bullet lines: * text or - text -> • text
    escaped = escaped.replace(/^[\*\-]\s+(.*)$/gm, '• $1');
    return escaped.replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  chatSendBtn.addEventListener('click', handleSendChat);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendChat(); });

  document.getElementById('nav-launch-ai').addEventListener('click', () => {
    document.getElementById('ai-section').scrollIntoView({ behavior: 'smooth' });
  });
});
