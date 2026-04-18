FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy workspace config from monorepo root
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy backend package.json
COPY backend/package.json backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy full source
COPY . .

# Build the API
RUN cd backend && pnpm build

WORKDIR /app/backend

EXPOSE 3001
CMD ["pnpm", "start"]
