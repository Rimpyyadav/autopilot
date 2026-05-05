# Social Autopilot

A SaaS app that automatically generates and schedules social media posts using AI.

## Live Demo
https://autopilot-1.onrender.com

## What it does
Scrapes trending topics from Reddit, generates platform-specific social media posts using Groq LLaMA AI, schedules them via cron jobs, and sends daily email digests to users.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- AI: Groq LLaMA 3.1
- Auth: JWT, Google OAuth, Passport.js
- Automation: Node-cron, Nodemailer
- Deploy: Render

## Features
- Reddit scraper for trending topics
- AI post generation based on user niche
- Google OAuth login
- Automated daily email digest
- Post scheduling dashboard
- Manual post generation

## Local Setup

```bash
git clone https://github.com/Rimpyyadav/autopilot
cd autopilot/server
npm install
cp .env.example .env
npm run dev
```

cd ../client
npm install
npm run dev
