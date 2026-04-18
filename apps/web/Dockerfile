# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY apps/web/package.json .
RUN npm install --no-audit --no-fund
COPY apps/web/ .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx config for port 8080
RUN echo 'server { listen 8080; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
