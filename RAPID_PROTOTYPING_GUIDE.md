# Rapid UI/UX Prototyping Guide

## Overview

This Web3 ecosystem is designed for **backend-first, frontend-agnostic development**. The API server (`http://localhost:3001`) provides all the Web3 functionality through RESTful endpoints, enabling you to build any frontend (React, HTML/HTMX, Vue, Angular, vanilla JS, etc.) without dealing with complex blockchain integration.

## Architecture Benefits

### 🎨 **Pure Black & White Design System**
- No colors, just sophisticated black and white styling
- Terminal-inspired aesthetics with JetBrains Mono font
- Consistent across all frontends through shared CSS variables

### 🔧 **Backend-First Development**
- All Web3 logic handled by API server
- Frontends only handle UI/UX and API calls
- Switch between React hooks, HTML/HTMX, or any framework instantly

### ⚡ **Rapid Prototyping**
- Mock API responses for immediate development
- Real blockchain integration when ready
- Consistent data contracts across all frontends

## API Endpoints (Port 3001)

### Authentication
```bash
# Privy social login
POST /api/auth/privy
{
  "privyToken": "privy_token_here",
  "userId": "optional_user_id"
}

# Get current user
GET /api/auth/me
Headers: Authorization: Bearer <jwt_token>

# Logout
POST /api/auth/logout
```

### Wallet Management
```bash
# Create smart wallet
POST /api/wallet/create
{
  "userId": "user_123",
  "type": "smart"
}

# Get wallet balance
GET /api/wallet/balance/0x1234...

# List user wallets
GET /api/wallet/list/:userId
```

### Transactions
```bash
# Send transaction
POST /api/transaction/send
{
  "from": "0x1234...",
  "to": "0x5678...",
  "value": "0.1",
  "usePaymaster": true
}

# Batch transactions
POST /api/transaction/batch
{
  "from": "0x1234...",
  "transactions": [
    {"to": "0x5678...", "value": "0.1"},
    {"to": "0x9abc...", "value": "0.2"}
  ]
}

# Check transaction status
GET /api/transaction/status/:txHash
```

### Smart Sessions (AI Automation)
```bash
# Create smart session
POST /api/session/create
{
  "walletAddress": "0x1234...",
  "permissions": ["transfer", "approve"],
  "duration": 3600,
  "automationRules": [
    {
      "trigger": "price_drop",
      "action": "buy_token",
      "parameters": {"token": "ETH", "threshold": "2000"}
    }
  ]
}

# Execute session action
POST /api/session/execute
{
  "sessionId": "session_123",
  "action": "buy_token",
  "parameters": {"amount": "0.1"}
}
```

### Crypto Predictions
```bash
# Create prediction
POST /api/prediction/create
{
  "symbol": "BTC",
  "timeframe": "1d",
  "predictionType": "price",
  "targetPrice": 47000
}

# Get market data
POST /api/prediction/market-data
{
  "symbols": ["BTC", "ETH"],
  "timeframe": "1h"
}
```

### System Status
```bash
# Health check
GET /health

# System status
GET /api/system/status

# Performance metrics
GET /api/system/metrics
```

## Frontend Implementation Examples

### 1. React with Hooks
```tsx
// Custom hook for wallet balance
function useWalletBalance(address: string) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/wallet/balance/${address}`)
      .then(res => res.json())
      .then(data => {
        setBalance(data.data.balance);
        setLoading(false);
      });
  }, [address]);

  return { balance, loading };
}

// Component usage
function WalletCard({ address }: { address: string }) {
  const { balance, loading } = useWalletBalance(address);
  
  return (
    <div className="bg-black border border-white p-4 font-mono">
      <h3 className="text-white text-sm mb-2">WALLET BALANCE</h3>
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="text-white text-lg">{balance} ETH</div>
      )}
    </div>
  );
}
```

### 2. HTML/HTMX (No JavaScript)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Web3 Dashboard</title>
  <script src="https://unpkg.com/htmx.org@1.9.2"></script>
  <style>
    body { 
      background: black; 
      color: white; 
      font-family: 'JetBrains Mono', monospace; 
    }
    .card { 
      border: 1px solid white; 
      padding: 1rem; 
      margin: 1rem 0; 
    }
  </style>
</head>
<body>
  <div class="card">
    <h3>WALLET BALANCE</h3>
    <div 
      hx-get="http://localhost:3001/api/wallet/balance/0x1234567890123456789012345678901234567890"
      hx-trigger="load"
      hx-target="this"
      hx-swap="innerHTML">
      Loading...
    </div>
  </div>

  <div class="card">
    <h3>SEND TRANSACTION</h3>
    <form 
      hx-post="http://localhost:3001/api/transaction/send"
      hx-target="#tx-result">
      <input type="text" name="to" placeholder="Recipient Address" />
      <input type="text" name="value" placeholder="Amount" />
      <button type="submit">SEND</button>
    </form>
    <div id="tx-result"></div>
  </div>
</body>
</html>
```

### 3. Vanilla JavaScript
```javascript
// Simple wallet manager
class Web3Wallet {
  constructor(apiBase = 'http://localhost:3001/api') {
    this.apiBase = apiBase;
  }

  async getBalance(address) {
    const response = await fetch(`${this.apiBase}/wallet/balance/${address}`);
    const data = await response.json();
    return data.data.balance;
  }

  async sendTransaction(from, to, value) {
    const response = await fetch(`${this.apiBase}/transaction/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, value, usePaymaster: true })
    });
    return response.json();
  }
}

// Usage
const wallet = new Web3Wallet();

wallet.getBalance('0x1234...').then(balance => {
  document.getElementById('balance').textContent = `${balance} ETH`;
});
```

### 4. Vue.js Component
```vue
<template>
  <div class="bg-black border border-white p-4 font-mono">
    <h3 class="text-white text-sm mb-2">WALLET BALANCE</h3>
    <div v-if="loading" class="text-white">Loading...</div>
    <div v-else class="text-white text-lg">{{ balance }} ETH</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  props: ['address'],
  setup(props) {
    const balance = ref(null)
    const loading = ref(true)

    onMounted(async () => {
      const response = await fetch(`http://localhost:3001/api/wallet/balance/${props.address}`)
      const data = await response.json()
      balance.value = data.data.balance.balance
      loading.value = false
    })

    return { balance, loading }
  }
}
</script>
```

## Design System

### CSS Variables (Copy to any frontend)
```css
:root {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --border-primary: #ffffff;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-mono);
  line-height: 1.4;
}

.card {
  border: 1px solid var(--border-primary);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.button {
  background: transparent;
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.2s;
}

.button:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}

.input {
  background: transparent;
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  padding: var(--spacing-sm);
  font-family: var(--font-mono);
  width: 100%;
}

.loading {
  opacity: 0.7;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
```

## Development Workflow

### 1. API-First Development
1. **Design API endpoints** (already done in `API_SPEC.md`)
2. **Create mock responses** (implemented in API server)
3. **Build frontend with mock data** (instant feedback)
4. **Connect real blockchain services** (when ready)

### 2. Multi-Frontend Development
```bash
# Start all services
pnpm dev  # API (3001) + VorteX (3000) + SCS (3002) + Aliza (3003)

# Or start individually
pnpm dev:api      # API server only
pnpm dev:vortex   # React dashboard
pnpm dev:scs      # Account abstraction demo
pnpm dev:aliza    # Crypto forecaster
```

### 3. Frontend Switching
- **React**: Use existing VorteX components
- **HTML/HTMX**: Copy CSS variables, use HTMX for API calls
- **Vue/Angular**: Install framework, copy design system
- **Mobile**: React Native, Flutter, etc. - same API endpoints

### 4. Styling Consistency
```bash
# Shared design tokens
packages/VorteX/src/styles/globals.css  # Copy these styles
```

## Real vs Mock Data

The API server currently provides **mock responses** for rapid development. To connect real blockchain services:

### 1. Environment Configuration
```bash
# apps/api-server/.env
PRIVY_APP_ID=your_real_privy_id
PRIVY_APP_SECRET=your_privy_secret
SONEIUM_RPC_URL=https://rpc.startale.com/soneium
BUNDLER_URL=https://bundler.startale.com
PAYMASTER_URL=https://paymaster.startale.com
```

### 2. Replace Mock Implementations
- `src/routes/auth.ts` - Add real Privy verification
- `src/routes/wallet.ts` - Add Startale SDK integration
- `src/routes/transaction.ts` - Add real bundler calls
- `src/routes/prediction.ts` - Add CoinGecko/CryptoCompare APIs

### 3. Database Integration (Optional)
```typescript
// Add to any route file
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Replace mock data with database queries
const users = await prisma.user.findMany()
```

## Quick Start Examples

### HTML/HTMX Prototype (30 seconds)
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/htmx.org@1.9.2"></script>
  <link rel="stylesheet" href="http://localhost:3000/styles.css">
</head>
<body style="background:black;color:white;font-family:monospace;padding:2rem;">
  <h1>WEB3 DASHBOARD</h1>
  
  <div hx-get="http://localhost:3001/api/system/status" hx-trigger="load">
    Loading system status...
  </div>
  
  <div hx-get="http://localhost:3001/api/wallet/balance/0x1234567890123456789012345678901234567890" hx-trigger="load">
    Loading wallet balance...
  </div>
</body>
</html>
```

### React Hook (1 minute)
```tsx
function useAPI(endpoint: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading };
}

// Use anywhere
function Dashboard() {
  const { data: status, loading } = useAPI('/api/system/status');
  
  return (
    <div className="bg-black text-white font-mono p-8">
      <h1>SYSTEM STATUS</h1>
      {loading ? 'Loading...' : JSON.stringify(status, null, 2)}
    </div>
  );
}
```

## Testing the Setup

Let me test all the endpoints to show you it's working:

```bash
# Test each endpoint (run these in terminal)
curl http://localhost:3001/health
curl http://localhost:3001/api/system/status
curl http://localhost:3001/api/wallet/balance/0x1234567890123456789012345678901234567890
```

This backend-first architecture gives you:
- ✅ **Instant prototyping** with any frontend
- ✅ **Pure black & white design** system
- ✅ **No Web3 complexity** in frontend code
- ✅ **Consistent APIs** across all interfaces
- ✅ **Easy testing** and development
- ✅ **Production-ready** architecture

You can now build any UI/UX you want while the backend handles all the Web3 complexity!
