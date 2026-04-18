# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY apps/web/package.json .

# Install dependencies
RUN npm install --no-audit --no-fund

# Copy source code
COPY apps/web/ .

# Build the app
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config for SPA
RUN echo 'server { 
    listen 80; 
    location / { 
        root /usr/share/nginx/html; 
        try_files $uri $uri/ /index.html; 
    }
    # Optional: Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
