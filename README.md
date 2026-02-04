# Khobor AI(খবর) 🎙️📰

**Khobor** is an AI-powered, hyper-local news aggregator and automated podcast generator designed specifically for the Bangladeshi context. It solves the "information overload" and "commuter's struggle" by transforming the latest news into a hands-free, audio-first experience.

### 🌐 Live Links
- **Primary:** [khobor.vercel.app](https://khobor.vercel.app)
- **AI Mirror:** [khobor-ai.vercel.app](https://khobor-ai.vercel.app)

---

### 🚀 The Problem
In Bangladesh, staying updated while commuting is difficult. Reading on a crowded bus or while walking is inconvenient. Moreover, news feeds are often cluttered with outdated traffic info or biased editorial content.

### ✨ The Solution: Khobor
Khobor acts as your **Autonomous AI Editor-in-Chief**:
1.  **Trust-Based Scraping:** Fetches news only from reliable, non-biased Bangladeshi sources.
2.  **AI Summarization:** Uses Google Gemini to summarize long articles into concise, neutral Bangla briefings.
3.  **Audio-First (Walking Mode):** Converts summaries into natural-sounding Bangla audio using Edge-TTS, allowing users to listen while walking.
4.  **Smart Lifecycle:** Automatically categorizes news. Ephemeral news (like traffic) expires in hours, while significant national news is archived.

---

### 🛠️ Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Shadcn UI.
- **Backend:** Next.js Server Actions & API Routes.
- **Database:** MongoDB (Mongoose) for persistent and ephemeral storage.
- **AI Engine:** Google Gemini 1.5 Flash (for processing and prioritization).
- **Speech:** Microsoft Edge-TTS (Natural Bangla Voices).
- **Automation:** GitHub Actions / Cron Jobs for hourly updates.

---

### 🛠️ Installation & Setup (Development)
*(This section will be updated as we initialize the project)*

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/khobor.git
