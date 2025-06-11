# Use Node.js LTS version
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy root files (including smart contracts & /.env)
COPY . .

# Install dependencies
RUN npm install
WORKDIR /app/server
RUN npm install

# Build smart contracts
WORKDIR /app
RUN npx hardhat compile

# Start server
WORKDIR /app/server
EXPOSE 4000
CMD ["npm", "run", "start"]