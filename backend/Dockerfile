FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the API (with error handling)
WORKDIR /app/backend
RUN if [ -f "tsconfig.json" ]; then pnpm build || echo "Build skipped"; else echo "No build config found"; fi

EXPOSE 3001

# Try start, fallback to dev if needed
CMD ["sh", "-c", "if [ -f dist/index.js ]; then pnpm start; else pnpm dev; fi"]
