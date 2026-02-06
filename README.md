# Gehred Nation API

Node + Express + Postgres API for coordinating family events, contacts, and other shared activities.

## Getting Started

1. Copy environment variables.
   ```bash
   cp .env.example .env
   ```

2. Start Postgres.
   ```bash
   docker compose up -d
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Generate Prisma client.
   ```bash
   npm run prisma:generate
   ```

5. Run the API in dev mode.
   ```bash
   npm run dev
   ```

Health check: `GET /api/v1/health`
