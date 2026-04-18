FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package.json .

# Install dependencies using npm
RUN npm install --no-audit --no-fund

# Copy source code
COPY backend/ .

EXPOSE 3001

CMD ["npm", "start"]
