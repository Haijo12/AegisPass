# Forge Gen 2 Monitor — Grow a Garden Script Hub

A modern, responsive web platform built exclusively for **Grow a Garden** on **Delta Executor**. The platform provides script distribution, real-time monitoring, HWID-locked key management, and a sleek dark-themed UI inspired by Rayfield Gen 2.

**Core Value Proposition:** "Grow a Garden, elevated by Forge" — an all-in-one script monitor with instant updates, HWID-locked access, and zero-friction user experience.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Core Features & Modules](#2-core-features--modules)
3. [Key System (Backend Critical)](#3-key-system-backend-critical)
4. [Real-Time Systems](#4-real-time-systems)
5. [Admin Panel](#5-admin-panel)
6. [Technical Architecture](#6-technical-architecture)
7. [Security Requirements](#7-security-requirements)
8. [UI/UX Design Specifications](#8-uiux-design-specifications)
9. [SEO & Meta](#9-seo--meta)
10. [Deliverables](#10-deliverables)

---

## 1. Project Overview

Build a modern, responsive web platform that serves as a centralized hub for **Grow a Garden** scripts, built exclusively for **Delta Executor**. The platform should provide script distribution, user key management, real-time status monitoring, and multi-executor compatibility — all wrapped in a sleek, dark-themed UI with purple/blue accent colors inspired by Rayfield Gen 2.

### Core Value Proposition
"Grow a Garden, elevated by Forge" — an all-in-one script distribution platform with instant updates, HWID-locked access, and zero-friction user experience.

### Target Audience
- Grow a Garden players on Roblox
- Delta Executor users (PC/Android)
- Players seeking automation: auto-farm, auto-harvest, auto-sell, pet spawner, dupe

---

## 2. Core Features & Modules

### A. Landing Page (Hero Section)

- **Headline:** "Grow a Garden, elevated by Forge"
- **Subheadline:** The ultimate Grow a Garden script monitor built for Delta Executor. Real-time tracking, HWID-locked keys, and sub-minute updates — all in one place.
- **CTA Buttons:** "Get Started" (primary) and "Discord" (secondary, links to Discord server)
- **Live Stats Bar:** Display real-time metrics:
  - Uptime percentage (e.g., "99.97% uptime")
  - Update speed (e.g., "<1m updates")
  - Online status indicator ("Online now")

### B. Trust Signals Section

Four feature cards with icons:

1. **"Delta-only, no key maze"** — Built exclusively for Delta Executor. No fake keys, no ad mazes, no pastebin traps.
2. **"HWID-locked keys"** — Access tied to user's hardware ID, non-shareable, non-stealable.
3. **"Updates in under a minute"** — Scripts auto-patch the moment Grow a Garden updates.
4. **"Real-time monitor"** — Track execution status, key health, and patch status live from the dashboard.

### C. Feature Showcase ("Not just a script — a full toolkit")

Interactive tabbed section where users can toggle between features:

| Tab | Content |
|------|---------|
| **Script Hub** | One-click loadstring for Grow a Garden. Auto-farm, auto-harvest, auto-sell, pet spawner, dupe, and more. Patched within a minute of game updates. |
| **Account Monitoring** | Track script usage, key status, HWID bindings, and expiration dates |
| **Live Stats** | Real-time uptime, active keys, script execution counts, game patch status |
| **Key System** | Generate, redeem, and manage HWID-locked access keys with expiration |

### D. Supported Executor

Delta Executor only:
- **Delta Executor** — Fully supported, optimized for stability and performance
- Works on PC and Android
- No key required for execution

### E. Supported Game

Grow a Garden only:
- **Grow a Garden** — The ultimate farming simulator on Roblox
- Features: Auto Farm, Auto Harvest, Auto Sell, Auto Buy Seeds, Pet Spawner, Dupe, Anti-AFK, ESP
- Status: Working / Updating / Patched
- Last updated timestamp
- One-click copy loadstring

### F. Script Detail View

For Grow a Garden script:
- **Loadstring display:** Syntax-highlighted Lua code block with one-click copy
- **Features list:** Bullet points of what the script does
- **Last updated:** Human-readable timestamp ("2 minutes ago")
- **Status indicator:** Green (working), Yellow (updating), Red (patched)
- **Executor tags:** Delta Executor
- **Version history:** Changelog of recent updates

---

## 3. Key System (Backend Critical)

### HWID-Locked Key Management

- **Key Generation:** Admin panel generates unique keys with configurable expiration (1 day, 7 days, 30 days, lifetime)
- **Key Redemption:** Users enter key on the website, which binds to their HWID (hardware ID from their Delta Executor)
- **HWID Validation:** Each key can only be used on one device. If HWID mismatch, key is rejected
- **Key Tiers:** Free (limited features), Premium (all features), VIP (priority updates + exclusive features)
- **Discord Bot Integration:** Keys can be generated, checked, and redeemed via Discord commands

### API Endpoints for Delta Executor

```http
POST /api/v1/auth/validate
Body: { key: string, hwid: string, executor: "Delta", game_id: "gag" }
Response: { valid: bool, expires_at: timestamp, scripts: [...] }

GET /api/v1/scripts/gag
Headers: { Authorization: Bearer <key> }
Response: { loadstring: string, version: string, features: [...] }

POST /api/v1/scripts/execute-log
Body: { key: string, hwid: string, game_id: "gag", script_version: string }
```

---

## 4. Real-Time Systems

### Status Page

- System health dashboard showing:
  - API status (operational/degraded/down)
  - Script update pipeline status
  - Grow a Garden script status
  - Uptime history (last 30 days)
  - Incident history

### Live Update Pipeline

- When Grow a Garden updates, the system detects it automatically
- Script is flagged as "Patched" immediately
- Developers are notified via webhook
- Updated script is deployed and status changes to "Working" within <1 minute
- Users see real-time status changes without refreshing

---

## 5. Admin Panel

### Dashboard

- Active keys count, revenue (if paid), active users, execution logs
- Recent activity feed

### Script Management

- CRUD operations for Grow a Garden script
- Upload/edit loadstring
- Set features, status, version
- Version control with changang

### Key Management

- Generate bulk keys
- Search keys by HWID, status, tier
- Revoke/blacklist keys
- View key usage analytics

### User Management

- View user profiles (HWID, keys, execution history)
- Ban/unban HWIDs
- View abuse reports

---

## 6. Technical Architecture

### Frontend

- **Framework:** React / Next.js 14 with App Router
- **Styling:** Tailwind CSS with custom dark theme inspired by Rayfield Gen 2
- **Colors:** Deep navy/black background (#0a0a0f), purple accents (#8b5cf6), blue highlights (#6366f1), green status (#22c55e)
- **Animations:** Framer Motion for smooth transitions, scroll reveals, tab switches
- **Icons:** Lucide React icons
- **Syntax Highlighting:** PrismJS or Shiki for Lua code blocks

### Backend

- **API:** Node.js with Express or Next.js API routes
- **Database:** PostgreSQL for relational data (users, keys, scripts), Redis for caching and rate limiting
- **Authentication:** JWT tokens + HWID binding
- **Real-time:** Server-Sent Events (SSE) or WebSockets for live status updates
- **Rate Limiting:** Strict limits on API endpoints to prevent abuse

### Infrastructure

- **Hosting:** Vercel (frontend) + Railway/Render (backend) or self-hosted
- **CDN:** Cloudflare for DDoS protection and global caching
- **Monitoring:** UptimeRobot or Better Uptime for status page
- **Discord Integration:** Discord.js bot for key management and notifications

---

## 7. Security Requirements

- All API endpoints require valid key + HWID combination
- Rate limiting: 100 requests/minute per key, 10 requests/minute per IP
- HWID spoofing detection — flag suspicious patterns
- Encrypted key storage (bcrypt/Argon2)
- No plaintext script storage — obfuscate or serve dynamically
- Anti-bot protection on key redemption (Cloudflare Turnstile or hCaptcha)
- Audit logging for all key validations and script executions

---

## 8. UI/UX Design Specifications

### Typography

- **Headlines:** Inter, bold, large sizes
- **Body:** Inter, regular, readable line height
- **Code:** JetBrains Mono or Fira Code

### Layout

- Single-page application feel with smooth scroll sections
- Sticky navigation with logo, links (Features, Script, Status, Discord, Get Started)
- Mobile-responsive hamburger menu
- Dark mode only (Rayfield Gen 2 inspired)

### Animations

- Hero text fade-in on load
- Stats counter animation (counting up)
- Feature cards slide-in on scroll
- Tab content crossfade transition
- Copy button feedback (checkmark animation)

---

## 9. SEO & Meta

- **Title:** "Forge Gen 2 Monitor — Grow a Garden | Delta Executor"
- **Meta description:** "The ultimate Grow a Garden script monitor built for Delta Executor. Real-time monitoring, HWID-locked keys, and instant updates."
- **Open Graph image with branding**
- **Favicon:** Custom logo icon (flower/forge icon)

---

## 10. Deliverables

1. Fully responsive landing page with all sections above
2. User authentication & key system (register, login, redeem key, view profile)
3. Script browser with one-click loadstring copy
4. Admin dashboard with full CRUD capabilities
5. REST API documented with OpenAPI/Swagger
6. Discord bot for key management and notifications
7. Status page with real-time health checks
8. Database schema and migration files

---

## Implementation Notes

This specification serves as a complete blueprint for building a Forge Gen 2 Monitor-style Grow a Garden script hub platform. The document can be handed to a developer, used with an AI code generator, or used as a project specification.

### Quick Start Commands

```bash
# Clone and setup
git clone <repo-url>
cd forge-gen2-monitor
npm install

# Start development
npm run dev

# Build for production
npm run build
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/monitor
JWT_SECRET=your_jwt_secret_key
WEBHOOK_SECRET=optional_webhook_verification
PORT=3000
WS_PORT=8080
DISCORD_BOT_TOKEN=your_discord_bot_token
GAME_ID=gag
EXECUTOR=Delta
```

### Docker Setup

```dockerfile
# backend/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000 8080
CMD ["node", "src/index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/monitor
    depends_on:
      - db
  
  frontend:
    build: ./frontend
    ports:
      - "80:3000"
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=monitor
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## License

Internal use only. Not for public distribution.
