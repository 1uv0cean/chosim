# Chosim Monorepo

A Turborepo-based monorepo containing a Next.js frontend and NestJS backend application following SOLID principles.

## Structure

```
chosim/
├── apps/
│   ├── web/          # Next.js frontend (App Router)
│   └── api/          # NestJS backend
├── packages/
│   ├── types/        # Shared TypeScript types (DTOs, entities)
│   └── utils/        # Shared utilities
├── CLAUDE.md         # Claude instruction context
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Start both applications in development mode (parallel)
npm run dev

# Build all packages and applications
npm run build

# Run linting across all packages
npm run lint

# Run tests across all packages  
npm run test

# Start production builds
npm start

# Clean all build artifacts and node_modules
npm run clean
```

## Applications

### Web App (Next.js)
- Located in `apps/web`
- Built with TypeScript, Tailwind CSS, and App Router
- Uses Turbopack for development
- Imports shared types from `@chosim/types`

### API (NestJS)
- Located in `apps/api`
- Built with TypeScript following SOLID principles
- Controllers → Services → Use Cases architecture
- Uses shared DTOs from `@chosim/types`

## Shared Packages

### Types (`@chosim/types`)
- Shared TypeScript interfaces, DTOs, and entities
- Used by both frontend and backend
- Includes validation decorators for DTOs

### Utils (`@chosim/utils`)
- Shared utility functions
- Pure functions for common operations

## Architecture Principles

This project follows **SOLID** principles:
- **S**ingle Responsibility: Each module has one reason to change
- **O**pen/Closed: Extend via new files, not modifications
- **L**iskov Substitution: Services use interfaces for substitutability
- **I**nterface Segregation: Small, specific interfaces
- **D**ependency Inversion: High-level modules depend on abstractions

## Development URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:3001