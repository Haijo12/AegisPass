# Roblox Account Monitor Panel

A web-based dashboard for tracking and monitoring Roblox accounts in real-time. Designed for premium users who need full visibility and control over multiple accounts from a single interface.

## Overview

The monitor panel allows you to:
- Track multiple Roblox accounts simultaneously
- View real-time activity and data pushes
- Manage tracking codes across all accounts
- Regenerate codes if compromised
- Access charts, analytics, and remote controls

## How It Works

### Architecture

```
┌─────────────────┐     HTTPS/WebSocket      ┌──────────────────┐
│   Roblox Client  │ ───────────────────────▶ │   Monitor Server  │
│   (Executor)     │ ◀─────────────────────── │   (Dashboard)     │
└─────────────────┘      JSON Payloads        └──────────────────┘
```

1. **User generates a tracking code** from the web dashboard
2. **Code is injected** into Roblox via an executor script
3. **Roblox client pushes data** to the monitor server using the code
4. **Dashboard displays** real-time stats, logs, and account status
5. **User can regenerate** the code if it leaks or is compromised

### Data Flow

1. **Code Generation**: User clicks "Track Code" → Server generates unique code → Code is linked to user's account
2. **Script Injection**: User clicks "Get Script" → Script is copied → Pasted into executor
3. **Data Push**: Roblox client sends heartbeat + telemetry to server every X seconds
4. **Dashboard Update**: Server processes data → Updates charts, account list, activity logs
5. **Code Regeneration**: User clicks "Regenerate" → Old code invalidated → New code issued

## Features

### Core Features
- **Unified Tracking Code**: One code covers all Roblox accounts
- **Real-time Dashboard**: Live charts, active accounts, data throughput
- **Account Management**: View which accounts are currently pushing data
- **Code Regeneration**: Instantly invalidate and replace leaked codes
- **Remote Controller**: Execute commands or toggle features remotely

### Dashboard Panels
- **Account Status**: Online/offline state, last seen, account IDs
- **Activity Charts**: Data volume over time, request frequency
- **Telemetry Logs**: Detailed event stream from each account
- **Settings**: Code management, notification preferences, privacy controls

## Requirements

### User Requirements
- Premium/buyer access to the monitor service
- A Roblox executor (compatible with the provided script)
- Active internet connection for dashboard access
- Modern web browser (Chrome, Firefox, Edge)

### Technical Requirements
- **Server**: Node.js/Python backend with WebSocket support
- **Database**: Redis or PostgreSQL for code storage and session management
- **Frontend**: React/Vue dashboard with real-time updates
- **Hosting**: Cloud deployment (VPS, AWS, Cloudflare Workers)
- **SSL**: HTTPS required for secure WebSocket connections

### Script Requirements
- Roblox executor compatibility (Synapse X, Krnl, Delta, etc.)
- `HttpService` enabled in Roblox
- WebSocket or `request` library support
- Proper error handling and reconnection logic

## Setup Guide

### For Users

1. **Get Your Code**
   - Visit the monitor dashboard
   - Click "Track Code"
   - Copy your unique tracking code

2. **Get the Script**
   - Click "Get Script"
   - Copy the Lua script to clipboard

3. **Inject and Run**
   - Open your executor
   - Paste the script
   - Replace `YOUR_CODE_HERE` with your tracking code
   - Execute

4. **Monitor**
   - Go to "My Accounts" to see connected accounts
   - View real-time data on the dashboard

### For Developers

#### Project Structure

```
monitor-panel/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AccountList.jsx
│   │   │   ├── Charts.jsx
│   │   │   └── CodeManager.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Monitor.jsx
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── codes.js
│   │   │   └── websocket.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── TrackingCode.js
│   │   └── index.js
│   └── package.json
├── script/
│   └── monitor.lua
└── README.md
```

#### Backend Setup

```javascript
// WebSocket handler for real-time data
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  const code = new URL(req.url, 'http://localhost').searchParams.get('code');

  if (!isValidCode(code)) {
    ws.close(1008, 'Invalid code');
    return;
  }

  ws.on('message', (data) => {
    const payload = JSON.parse(data);
    handleTelemetry(code, payload);
  });

  ws.on('close', () => {
    markAccountOffline(code);
  });
});
```

#### Frontend Dashboard

```jsx
function Dashboard() {
  const [accounts, setAccounts] = useState([]);
  const [charts, setCharts] = useState({});

  useEffect(() => {
    const ws = new WebSocket('wss://monitor.example.com/ws');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateAccounts(data.accounts);
      updateCharts(data.metrics);
    };
    return () => ws.close();
  }, []);

  return (
    <div className="dashboard">
      <AccountList accounts={accounts} />
      <Charts data={charts} />
      <CodeManager />
    </div>
  );
}
```

#### Lua Script (Roblox Side)

```lua
-- Monitor Panel Script
local CONFIG = {
  CODE = "YOUR_CODE_HERE",
  SERVER = "wss://monitor.example.com/ws",
  INTERVAL = 5 -- seconds
}

local HttpService = game:GetService("HttpService")
local RunService = game:GetService("RunService")

local ws = WebSocket.connect(CONFIG.SERVER .. "?code=" .. CONFIG_CODE)

local function sendTelemetry()
  local data = {
    userId = game.Players.LocalPlayer.UserId,
    username = game.Players.LocalPlayer.Name,
    timestamp = os.time(),
    placeId = game.PlaceId,
    jobId = game.JobId,
    fps = math.floor(1 / RunService:GetDeltaTime())
  }
  ws:Send(HttpService:JSONEncode(data))
end

-- Send heartbeat every X seconds
while true do
  sendTelemetry()
  wait(CONFIG.INTERVAL)
end
```

## Security Considerations

- **Code Security**: Tracking codes should be cryptographically secure (UUID v4)
- **Rate Limiting**: Implement rate limits on WebSocket connections and API endpoints
- **Data Privacy**: Only collect necessary telemetry; avoid sensitive data
- **Authentication**: Require user authentication for dashboard access
- **Code Expiry**: Optional auto-expiry after inactivity period
- **IP Binding**: Optional IP restriction on code usage

## Deployment

### Environment Variables

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/monitor
JWT_SECRET=your_jwt_secret_key
WEBHOOK_SECRET=optional_webhook_verification
PORT=3000
WS_PORT=8080
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

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Script not connecting | Check WebSocket URL and code validity |
| Dashboard not updating | Verify WebSocket connection in browser dev tools |
| Accounts not showing | Ensure code matches and accounts are online in-game |
| High latency | Reduce telemetry interval or optimize payload size |

## License

Internal use only. Not for public distribution.
