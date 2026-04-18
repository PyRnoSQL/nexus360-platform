FROM node:20-alpine

WORKDIR /app

# Copy only backend files — no workspace needed, it's plain Node.js
COPY backend/package.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/ ./

EXPOSE 3001
CMD ["node", "src/app.js"]
