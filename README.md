# 🛡️ Montgomery Shield
### From the birthplace of Civil Rights to the future of civic safety.

**Montgomery Shield** is a real-time public safety intelligence dashboard for the City of Montgomery, Alabama — built for the [GenAI Academy World Wide Vibes Hackathon 2026](https://academy.genai.works/hackathon).

🔗 **Live Demo:** [montgomery-shield.vercel.app](https://montgomery-shield.vercel.app)

---

## The Problem

Montgomery, AL is facing a compounding public safety crisis:

- 👮 Police force down **42%** — from 485 officers (2020) to 280 (2024)
- 🚨 Crime rate **1.65x** the national average
- 🚒 Fire response times averaging **6m 41s** — 1.4x above the NFPA safe standard of 4 minutes
- 💸 **$117.9M** in property lost to fires — including a catastrophic $101M lost in a single month

At the same time, **Meta is investing $1.5 billion** in a data centre arriving end of 2026. AWS and Google are following. Montgomery's ability to attract this investment depends directly on public safety improvements.

Data exists. It just hasn't been connected — until now.

---

## What Montgomery Shield Does

A five-page civic intelligence platform that turns raw open data into actionable insight for residents, city officials, and investors.

| Page | What It Shows |
|---|---|
| **Overview** | City-wide crisis snapshot with live stat cards and investment context |
| **Emergency** | 911 call trends, fire incident map, response times by district |
| **Neighbourhood** | Code violations map, environmental nuisance layer, top 311 service requests |
| **Economic** | Property saved vs lost, business growth, top business categories, Meta investment banner |
| **Stations** | All fire stations and police facilities mapped, staffing crisis banner |

Plus two floating widgets available on every page:

- 📰 **Live News Feed** — real Montgomery headlines scraped via Bright Data, categorised by Crime / Emergency / Police / Economy
- 🤖 **Montgomery Shield Assistant** — AI chatbot powered by Groq + Llama 3.1, pre-loaded with Montgomery public safety data

---

## Live Data Sources

All 9 data sources pull live from the **City of Montgomery Open Data Portal**:

| Dataset | Source |
|---|---|
| 911 Emergency Calls | ArcGIS FeatureServer |
| Fire Rescue Incidents | ArcGIS FeatureServer |
| Fire Property Saved/Lost | ArcGIS FeatureServer |
| Fire & Police Stations | ArcGIS FeatureServer |
| 311 Service Requests | Montgomery GIS |
| Code Violations | Montgomery GIS |
| Business Licenses | Montgomery GIS |
| Environmental Nuisance | ArcGIS FeatureServer |
| Suspected Rentals | ArcGIS FeatureServer |

Live news is scraped from **Google News RSS** via **Bright Data Web Unlocker**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS v3 |
| Maps | Leaflet + react-leaflet |
| Charts | Recharts |
| Routing | react-router-dom |
| AI Chat | Groq API + Llama 3.1 8B Instant |
| News Scraping | Bright Data Web Unlocker |
| Deployment | Vercel |

---

## Hackathon Challenges Addressed

- ✅ **Challenge 4 — Public Safety & Emergency Response** *(primary)*
- ✅ **Challenge 2 — Workforce, Business & Economic Growth** *(linked)*
- ✅ **Challenge 1 — Civic Access & Community Communication** *(linked)*

---

## Running Locally

### Prerequisites
- Node.js 18+
- Bright Data account (Web Unlocker zone)
- Groq API key (free at console.groq.com)

### Setup

```bash
git clone https://github.com/rohan-crypto/montgomery_shield
cd montgomery_shield
npm install
```

Create a `.env` file in the root:

```env
VITE_BRIGHTDATA_TOKEN=your_brightdata_token
VITE_BRIGHTDATA_ZONE=your_zone_name
VITE_GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add the three environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Vite

---

## Project Structure

```
src/
├── api/           # All data fetching (9 APIs + AI + news)
├── components/
│   ├── layout/    # Navbar, Sidebar, Footer
│   ├── map/       # Leaflet map layers
│   ├── charts/    # Recharts components
│   └── ui/        # StatCard, LiveNewsFeed, AIChatWidget
├── pages/         # Overview, Emergency, Neighbourhood, Economic, Stations
├── hooks/         # Custom data hooks
├── utils/         # Formatters, map helpers, data processors
└── constants/     # API endpoints, map config
```

---

## Built By

**Rohan Bhardwaj** — Solo entry, GenAI Academy World Wide Vibes Hackathon, March 2026.

> *"Montgomery gave America the Civil Rights Movement. Montgomery Shield gives Montgomery the data infrastructure it deserves."*

---

*Data sourced from the [City of Montgomery Open Data Portal](https://data.montgomeryal.gov)*