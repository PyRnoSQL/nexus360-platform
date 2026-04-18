FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY backend/ .

EXPOSE 3001

CMD ["npm", "start"]
