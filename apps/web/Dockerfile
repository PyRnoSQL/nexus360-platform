FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY apps/web/package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY apps/web/ .

# Build the app (if needed, or just copy)
RUN npm run build || echo "No build script"

FROM node:18-alpine

WORKDIR /app

# Copy built files or source
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/

# Install serve
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
