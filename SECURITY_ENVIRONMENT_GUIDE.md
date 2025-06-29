# Environment Configuration Guide

## SECURITY PRINCIPLES
- **Never commit API keys to git**
- **Use environment variables for all secrets**
- **Different keys for development/production**
- **Rotate keys regularly**

## REQUIRED ENVIRONMENT VARIABLES

### Development (.env.local - DO NOT COMMIT)
```env
# Blockchain Configuration
SONEIUM_RPC_URL=https://rpc.minato.soneium.org/
PRIVY_APP_ID=clxxxxxxxxxxxxxxxxxxxx
PRIVY_APP_SECRET=xxxxxxxxxxxxxxxxxxxxx

# AI Services (Server-side only)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
HUGGINGFACE_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Storage Services
IPFS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PINATA_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PINATA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Audio Processing
AUDIO_PROCESSING_API=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/creator_db

# Security
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_KEY=your-32-character-encryption-key
```

### Production Environment Variables
```env
# Set these in your deployment platform (Vercel, Railway, etc.)
NODE_ENV=production
SONEIUM_RPC_URL=https://rpc.soneium.org/
PRIVY_APP_ID=prod_clxxxxxxxxxxxxxxxxxxxx
PRIVY_APP_SECRET=prod_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-prod-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# ... other production keys
```

## API KEY MANAGEMENT

### Client-Side Rules
```typescript
// ❌ NEVER DO THIS
const openaiKey = "sk-xxxxxxxxx"; // Exposed to users!

// ✅ CORRECT - Server-side only
// In API route
const openaiKey = process.env.OPENAI_API_KEY;
```

### Server-Side Implementation
```typescript
// apps/api-server/src/config/environment.ts
export const config = {
  blockchain: {
    rpcUrl: process.env.SONEIUM_RPC_URL!,
    privyAppId: process.env.PRIVY_APP_ID!,
    privySecret: process.env.PRIVY_APP_SECRET!,
  },
  ai: {
    openaiKey: process.env.OPENAI_API_KEY!,
    anthropicKey: process.env.ANTHROPIC_API_KEY!,
    huggingfaceToken: process.env.HUGGINGFACE_TOKEN!,
  },
  storage: {
    ipfsKey: process.env.IPFS_API_KEY!,
    pinataKey: process.env.PINATA_API_KEY!,
    pinataSecret: process.env.PINATA_SECRET_KEY!,
  }
};

// Validate required environment variables
const requiredEnvVars = [
  'SONEIUM_RPC_URL',
  'PRIVY_APP_ID',
  'OPENAI_API_KEY',
  'IPFS_API_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

## DEPLOYMENT CONFIGURATION

### Vercel (Frontend)
```bash
# Set environment variables in Vercel dashboard
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_PRIVY_APP_ID
# Never add secret keys to NEXT_PUBLIC_ variables
```

### Railway (Backend)
```bash
# Set environment variables in Railway dashboard
railway variables set OPENAI_API_KEY=sk-...
railway variables set DATABASE_URL=postgresql://...
```

### Local Development Setup
```bash
# Copy example environment file
cp .env.example .env.local

# Edit .env.local with your actual keys
nano .env.local

# Never commit .env.local
echo ".env.local" >> .gitignore
```

## AI INTEGRATION SECURITY

### Vercel AI SDK Configuration
```typescript
// apps/api-server/src/routes/ai.ts
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Server-side API route only
export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  const result = await generateText({
    model: openai('gpt-4', {
      apiKey: process.env.OPENAI_API_KEY, // Server-side only
    }),
    prompt: `Create audio description: ${prompt}`,
    maxTokens: 150,
  });
  
  return Response.json({ description: result.text });
}
```

### Rate Limiting for AI APIs
```typescript
// Prevent API abuse
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 AI requests per window
  message: 'Too many AI requests',
});

app.use('/api/ai', rateLimiter);
```

## STORAGE SECURITY

### IPFS Configuration
```typescript
// Secure IPFS upload
import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      process.env.IPFS_API_KEY + ':' + process.env.IPFS_API_SECRET
    ).toString('base64')}`,
  },
});
```

### File Upload Validation
```typescript
// Validate file types and sizes
const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
const maxSize = 50 * 1024 * 1024; // 50MB

function validateAudioFile(file: File): boolean {
  return allowedTypes.includes(file.type) && file.size <= maxSize;
}
```

## MONITORING & ALERTS

### Key Rotation Schedule
```typescript
// Set up alerts for key rotation
const keyRotationSchedule = {
  'OPENAI_API_KEY': 90, // days
  'PRIVY_APP_SECRET': 180,
  'JWT_SECRET': 365,
  'ENCRYPTION_KEY': 365,
};
```

### Usage Monitoring
```typescript
// Track API usage to prevent overages
const apiUsageTracker = {
  openai: { limit: 1000, used: 0 },
  ipfs: { limit: 10000, used: 0 },
  audio: { limit: 500, used: 0 },
};
```

## EMERGENCY PROCEDURES

### Key Compromise Response
1. **Immediately revoke compromised keys**
2. **Generate new keys**
3. **Update all environments**
4. **Audit access logs**
5. **Notify users if necessary**

### Backup Strategy
```typescript
// Secure backup of critical data
const backupConfig = {
  frequency: 'daily',
  retention: 30, // days
  encryption: true,
  offsite: true,
};
```

This configuration ensures your creator platform is secure while maintaining ease of development and deployment.
