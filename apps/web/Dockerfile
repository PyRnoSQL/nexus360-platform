FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY apps/web/package.json .

# Install dependencies
RUN npm install --no-audit --no-fund

# Copy source code
COPY apps/web/ .

# Build (if needed)
RUN npm run build || echo "No build script"

FROM node:18-alpine

WORKDIR /app

# Copy dist or source
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/

# Install serve globally
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000", "--single"]
