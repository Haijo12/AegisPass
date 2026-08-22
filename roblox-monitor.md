# WisHub — Roblox Script Hub Platform

A modern, responsive web platform that serves as a centralized hub for Roblox Lua scripts. The platform provides script distribution, user key management, real-time status monitoring, and multi-executor compatibility — all wrapped in a sleek, dark-themed UI with purple/blue accent colors.

**Core Value Proposition:** "Every wish, one trusted hub" — an all-in-one script distribution platform with instant updates, HWID-locked access, and zero-friction user experience.

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

Build a modern, responsive web platform that serves as a centralized hub for Roblox Lua scripts. The platform should provide script distribution, user key management, real-time status monitoring, and multi-executor compatibility — all wrapped in a sleek, dark-themed UI with purple/blue accent colors.

### Core Value Proposition
"Every wish, one trusted hub" — an all-in-one script distribution platform with instant updates, HWID-locked access, and zero-friction user experience.

---

## 2. Core Features & Modules

### A. Landing Page (Hero Section)

- **Headline:** "Every wish, one trusted hub" (with italic emphasis on "one trusted hub")
- **Subheadline:** Describe the platform as an all-in-one Roblox script hub with always-updated scripts and supporting tools
- **CTA Buttons:** "Get Started" (primary) and "Discord" (secondary, links to Discord server)
- **Live Stats Bar:** Display real-time metrics:
  - Uptime percentage (e.g., "99.97% uptime")
  - Update speed (e.g., "<1m updates")
  - Supported executors count (e.g., "8+ executors")
  - Online status indicator ("Online now · Updated moments ago")

### B. Trust Signals Section

Four feature cards with icons:

1. **"No malware, no popups"** — No ad mazes, no fake keys, no pastebin traps
2. **"HWID-locked keys"** — Access tied to user's hardware ID, non-shareable, non-stealable
3. **"Updates in under a minute"** — Scripts auto-patch the moment a game updates
4. **"Runs on many executors"** — Compatible with Wave, Delta, Krnl, Swift, Velocity, Codex, Hydrogen, Fluxus, Arceus X, Cryptic, Seliware, Volcano, Bunni, Ronin

### C. Feature Showcase ("Not just scripts, a whole toolkit")

Interactive tabbed section where users can toggle between features:

| Tab | Content |
|------|---------|
| **Script Hub** | Every supported game in one place. Each script patched within a minute of game updates. One-click copy loadstring. No re-downloads. Features: Per-game scripts, One-click copy, Patched in <1m |
| **Account Monitoring** | Track script usage, key status, HWID bindings, and expiration dates |
| **Live Stats** | Real-time uptime, active users, script execution counts, game patch status |
| **Key System** | Generate, redeem, and manage HWID-locked access keys with expiration |

### D. Executor Compatibility Grid

A visually appealing grid/logos section showing all supported executors:
- Wave, Swift, Velocity, Codex, Delta, Hydrogen, Krnl, Fluxus, Arceus X, Cryptic, Seliware, Volcano, Bunni, Ronin
- Each with logo/icon and name
- Hover effects showing compatibility status

### E. Supported Games Directory

A filterable grid of supported Roblox games:
- Game cards with icon/thumbnail, name, script status
- Status badges: "Popular" (most used), "Focused" (actively being built/improved), "Stable", "Patched"
- Clicking a game reveals: script description, features list, loadstring code block with copy button, last updated timestamp, executor compatibility
- Games should include: GPO (Grand Piece Online), Fruit Seas, Fisch, Sol's RNG, Blox Fruits, Slap Battles, 99 Nights, etc.

### F. Script Detail View

For each game script:
- **Loadstring display:** Syntax-highlighted Lua code block with one-click copy
- **Features list:** Bullet points of what the script does
- **Last updated:** Human-readable timestamp ("2 minutes ago")
- **Status indicator:** Green (working), Yellow (updating), Red (patched)
- **Executor tags:** Which executors support this script
- **Version history:** Changelog of recent updates

---

## 3. Key System (Backend Critical)

### HWID-Locked Key Management

- **Key Generation:** Admin panel generates unique keys with configurable expiration (1 day, 7 days, 30 days, lifetime)
- **Key Redemption:** Users enter key on the website, which binds to their HWID (hardware ID from their executor)
- **HWID Validation:** Each key can only be used on one device. If HWID mismatch, key is rejected
- **Key Tiers:** Free (limited scripts), Premium (all scripts), VIP (priority updates + exclusive scripts)
- **Discord Bot Integration:** Keys can be generated, checked, and redeemed via Discord commands

### API Endpoints for Executors

```http
POST /api/v1/auth/validate
Body: { key: string, hwid: string, executor: string, game_id: string }
Response: { valid: bool, expires_at: timestamp, scripts: [...] }

GET /api/v1/scripts/{game_id}
Headers: { Authorization: Bearer <key> }
Response: { loadstring: string, version: string, features: [...] }

POST /api/v1/scripts/execute-log
Body: { key: string, hwid: string, game_id: string, script_version: string }
```

---

## 4. Real-Time Systems

### Status Page

- System health dashboard showing:
  - API status (operational/degraded/down)
  - Script update pipeline status
  - Individual game script statuses
  - Uptime history (last 30 days)
  - Incident history

### Live Update Pipeline

- When a Roblox game updates, the system detects it automatically
- Scripts are flagged as "Patched" immediately
- Developers are notified via webhook
- Updated scripts are deployed and status changes to "Working" within <1 minute
- Users see real-time status changes without refreshing

---

## 5. Admin Panel

### Dashboard

- Active keys count, revenue (if paid), active users, execution logs
- Recent activity feed

### Script Management

- CRUD operations for game scripts
- Upload/edit loadstrings
- Set game IDs, supported executors, features, status
- Version control with changelog

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
- **Styling:** Tailwind CSS with custom dark theme
- **Colors:** Deep navy/black background (#0a0a0f), purple accents (#8b5cf6), blue highlights (#3b82f6), green status (#22c55e)
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

- **Headlines:** Inter or Geist, bold, large sizes
- **Body:** Inter, regular, readable line height
- **Code:** JetBrains Mono or Fira Code

### Layout

- Single-page application feel with smooth scroll sections
- Sticky navigation with logo, links (Scripts, Status, Discord, Get Started), and user profile
- Mobile-responsive hamburger menu
- Dark mode only (no light mode needed)

### Animations

- Hero text fade-in on load
- Stats counter animation (counting up)
- Feature cards slide-in on scroll
- Tab content crossfade transition
- Copy button feedback (checkmark animation)

---

## 9. SEO & Meta

- **Title:** "WisHub — The All-in-One Roblox Script Hub"
- **Meta description:** "Always-updated scripts, HWID-locked keys, and live stats. The trusted hub for Roblox scripting."
- **Open Graph image with branding**
- **Favicon:** Custom logo icon

---

## 10. Deliverables

1. Fully responsive landing page with all sections above
2. User authentication & key system (register, login, redeem key, view profile)
3. Script browser with search, filter, and detail views
4. Admin dashboard with full CRUD capabilities
5. REST API documented with OpenAPI/Swagger
6. Discord bot for key management and notifications
7. Status page with real-time health checks
8. Database schema and migration files

---

## Implementation Notes

This specification serves as a complete blueprint for building a WisHub-style Roblox script hub platform. The document can be handed to a developer, used with an AI code generator, or used as a project specification.

### Quick Start Commands

```bash
# Clone and setup
git clone <repo-url>
cd wishub-monitor
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
