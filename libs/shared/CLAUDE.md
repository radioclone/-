# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the shared library (`@web3-ecosystem/shared`) within a Web3 ecosystem monorepo. It provides common components, hooks, types, and utilities used across multiple Web3 applications including VorteX (core framework), SCS-AA-Demo-UI (account abstraction demo), and Aliza-Crypto-Forecaster (AI crypto predictions).

## Key Commands

**Development:**
```bash
pnpm dev          # Start TypeScript compiler in watch mode
pnpm build        # Build the library 
pnpm type-check   # Run TypeScript type checking
pnpm clean        # Remove dist folder
```

**From monorepo root:**
```bash
pnpm dev          # Start all packages concurrently
pnpm build        # Build all packages in parallel
pnpm lint         # Lint all packages
pnpm type-check   # Type check all packages
```

## Architecture

### Library Structure
```
src/
├── components/     # React UI components (Button, Input, Card, Alert, Loading)
├── hooks/         # Custom React hooks (useForm, useAsync, useAPI)
├── constants.ts   # Shared constants (chains, API endpoints, error codes)
├── types.ts       # TypeScript type definitions
├── utils.ts       # Utility functions
└── index.ts       # Main export file
```

### Design System
- **Monochrome palette**: Black/white/grays only
- **Sharp edges**: No border radius (border-radius: 0)
- **8px grid system**: All spacing uses 8px increments
- **CSS custom properties**: Colors and spacing defined as CSS variables
- **JetBrains Mono font**: Monospace typography throughout

### Key Type Definitions
- `User`: Core user model with social login and smart account integration
- `SmartAccount`: ERC-4337 account abstraction types
- `AuthState`: Authentication state management
- `ChainConfig`: Multi-chain configuration (Ethereum, Polygon, Arbitrum, Optimism)
- `CryptoPrediction`: AI prediction data structures
- `Web3Event`/`AuthEvent`: Type-safe event system

### Component Patterns
All components follow these conventions:
- Extend `BaseComponentProps` (className, children)
- Use CSS custom properties for styling
- Export both component and props interface
- Support variant-based styling (primary/secondary, sm/md/lg)

### Hook Architecture
- `useForm`: Comprehensive form handling with validation rules
- `useAsync`: Async state management with loading/error states  
- `useAPI`: Standardized API request handling with error handling

## Integration Points

### Workspace Dependencies
- Uses `workspace:*` for internal package references
- Peer dependencies: React 19, viem, wagmi
- TypeScript path mapping for clean imports

### Web3 Integration
- **Account Abstraction**: ERC-4337 smart accounts via Startale AA SDK
- **Social Login**: Web3Auth and Privy integration
- **Multi-chain**: Ethereum, Polygon, Arbitrum, Optimism support
- **Gasless Transactions**: Paymaster integration for sponsored transactions

### State Management
- Designed to work with Zustand (global state)
- Jotai support for atomic state
- React Context patterns for providers

## Development Guidelines

### Type Safety
- Strict TypeScript configuration
- Comprehensive type exports for all components and hooks
- Use utility types: `Optional<T, K>`, `RequiredFields<T, K>`, `DeepPartial<T>`

### Styling
- Use CSS custom properties defined in `design-system.css`
- Follow monochrome design system strictly
- No external UI libraries - custom components only

### Constants Management
- Chain configurations in `SUPPORTED_CHAINS`
- API endpoints centralized in constants
- Error codes and messages standardized
- Feature flags for environment-specific behavior

## Build Output
- Compiles to `dist/` directory
- Main entry: `dist/index.js`
- Type definitions: `dist/index.d.ts`
- ES modules only (no CommonJS)