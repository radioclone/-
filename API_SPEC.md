# VorteX API Specification
## Frontend-Agnostic Backend for Rapid UI Prototyping

### 🎯 Design Philosophy
**Decouple UI from Logic**: Any frontend (React, HTML/HTMX, Vue, Svelte) can consume these APIs without breaking the core functionality.

---

## 📡 Core API Endpoints

### **1. Authentication API**
```bash
# Social Login (Privy)
POST /api/auth/login
{
  "provider": "google|twitter|discord",
  "redirect_url": "http://localhost:3000/callback"
}
→ Response: { "auth_url": "https://privy.io/oauth/...", "session_id": "abc123" }

# Check Auth Status
GET /api/auth/status
→ Response: { "authenticated": true, "user": {...}, "wallet_address": "0x..." }

# Logout
POST /api/auth/logout
→ Response: { "success": true }
```

### **2. Smart Account API**
```bash
# Create Smart Account
POST /api/wallet/create
{
  "owner_address": "0x...",
  "index": 0
}
→ Response: { "smart_account": "0x...", "deployed": false }

# Get Account Info
GET /api/wallet/info?address=0x...
→ Response: { 
  "address": "0x...", 
  "balance": "1.5", 
  "deployed": true,
  "nonce": 5
}

# Deploy Account
POST /api/wallet/deploy
{
  "smart_account": "0x..."
}
→ Response: { "tx_hash": "0x...", "status": "pending" }
```

### **3. Transaction API**
```bash
# Send Transaction
POST /api/tx/send
{
  "from": "0x...",
  "to": "0x...",
  "value": "0.1",
  "data": "0x...",
  "sponsored": true
}
→ Response: { "user_op_hash": "0x...", "status": "pending" }

# Transaction Status
GET /api/tx/status?hash=0x...
→ Response: { "status": "confirmed", "block_number": 12345, "gas_used": "21000" }

# Transaction History
GET /api/tx/history?address=0x...&limit=10
→ Response: { "transactions": [...] }
```

### **4. Smart Sessions API**
```bash
# Create Session
POST /api/session/create
{
  "smart_account": "0x...",
  "permissions": {
    "target": "0x...",
    "function": "trade",
    "value_limit": "0.01",
    "calls_limit": 10,
    "valid_until": 1234567890
  }
}
→ Response: { "session_key": "0x...", "session_id": "sess_123" }

# Use Session
POST /api/session/execute
{
  "session_id": "sess_123",
  "target": "0x...",
  "data": "0x...",
  "value": "0.001"
}
→ Response: { "tx_hash": "0x...", "remaining_calls": 9 }

# List Sessions
GET /api/session/list?account=0x...
→ Response: { "sessions": [...] }
```

### **5. Prediction API**
```bash
# Get Price Prediction
GET /api/predict/price?symbol=BTC&timeframe=1h
→ Response: { 
  "symbol": "BTC", 
  "current_price": 45000, 
  "predicted_price": 46200,
  "confidence": 0.85,
  "timeframe": "1h"
}

# Execute Prediction Trade
POST /api/predict/trade
{
  "smart_account": "0x...",
  "symbol": "BTC",
  "action": "buy|sell",
  "amount": "0.01",
  "session_id": "sess_123"
}
→ Response: { "trade_id": "trade_456", "status": "executed" }
```

### **6. System API**
```bash
# System Status
GET /api/system/status
→ Response: {
  "soneium_network": "online",
  "privy_auth": "online", 
  "bundler": "online",
  "paymaster": "online",
  "smart_sessions": "offline"
}

# Configuration
GET /api/config
→ Response: {
  "chain_id": 1946,
  "network": "soneium_minato",
  "contracts": {...},
  "features": {...}
}
```

---

## 🛠️ Implementation Strategy

### **Phase 1: Mock API Server (1 day)**
Create a simple Express.js server that returns mock data for all endpoints:

```javascript
// server/api.js
const express = require('express');
const app = express();

app.get('/api/system/status', (req, res) => {
  res.json({
    soneium_network: 'online',
    privy_auth: 'online',
    bundler: 'online',
    paymaster: 'online',
    smart_sessions: 'offline'
  });
});

// ... more endpoints
```

### **Phase 2: Real Integration (3-5 days)**
Connect real blockchain services:

```javascript
// Real Privy integration
app.post('/api/auth/login', async (req, res) => {
  const authUrl = await privyClient.createAuthUrl(req.body.provider);
  res.json({ auth_url: authUrl });
});

// Real smart account creation
app.post('/api/wallet/create', async (req, res) => {
  const account = await toStartaleSmartAccount({
    signer: walletClient,
    chain: soneiumMinato,
    index: req.body.index
  });
  res.json({ smart_account: account.address });
});
```

---

## 🎨 Frontend Flexibility Examples

### **Option 1: React with Hooks**
```javascript
// useVorteX.js
export function useAuth() {
  const [user, setUser] = useState(null);
  
  const login = async (provider) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ provider })
    });
    // Handle response
  };
  
  return { user, login };
}

// Component
function LoginButton() {
  const { login } = useAuth();
  return <button onClick={() => login('google')}>Login</button>;
}
```

### **Option 2: HTML + HTMX**
```html
<!-- Pure HTML/HTMX Frontend -->
<div id="app">
  <button 
    hx-post="/api/auth/login" 
    hx-vals='{"provider": "google"}'
    hx-target="#status"
  >
    Login with Google
  </button>
  
  <div id="status" hx-get="/api/auth/status" hx-trigger="load"></div>
  
  <button 
    hx-post="/api/wallet/create"
    hx-target="#wallet-info"
    hx-trigger="click"
  >
    Create Smart Account
  </button>
  
  <div id="wallet-info"></div>
</div>
```

### **Option 3: Vanilla JavaScript**
```javascript
// Pure JS Frontend
class VorteXClient {
  async login(provider) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider })
    });
    return response.json();
  }
  
  async createWallet(ownerAddress) {
    const response = await fetch('/api/wallet/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner_address: ownerAddress })
    });
    return response.json();
  }
}

// Usage
const client = new VorteXClient();
document.getElementById('login-btn').onclick = () => client.login('google');
```

### **Option 4: cURL for Testing**
```bash
# Test authentication
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"provider": "google"}'

# Test wallet creation
curl -X POST http://localhost:3000/api/wallet/create \
  -H "Content-Type: application/json" \
  -d '{"owner_address": "0x1234..."}'

# Test system status
curl http://localhost:3000/api/system/status
```

---

## 🚀 Deployment Strategy

### **Development Workflow:**
1. **API First**: Build and test all endpoints with mock data
2. **Frontend Choice**: Build UI with any framework you prefer
3. **Real Integration**: Connect APIs to actual blockchain services
4. **Deploy**: Backend to Railway/Vercel, Frontend anywhere

### **Benefits:**
- ✅ **UI Freedom**: Switch from React to HTML/HTMX anytime
- ✅ **Fast Prototyping**: Test UX without blockchain complexity  
- ✅ **No Breaking Changes**: Backend API contract stays stable
- ✅ **Easy Testing**: Use cURL/Postman to test functionality
- ✅ **Team Collaboration**: Frontend devs work independently

### **File Structure:**
```
packages/
├── vortex-api/          # Backend API server
│   ├── routes/
│   ├── services/
│   └── server.js
├── vortex-react/        # React frontend (optional)
├── vortex-htmx/         # HTML/HTMX frontend (optional)
└── vortex-vanilla/      # Pure JS frontend (optional)
```

This approach gives you **maximum flexibility** - you can prototype with simple HTML first, then switch to React later, all without touching the backend logic!
