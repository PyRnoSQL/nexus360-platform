FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY backend/package.json backend/

# Install dependencies
WORKDIR /app/backend
RUN npm install

# Copy source code
COPY backend/ .

EXPOSE 3001

CMD ["npm", "start"]
