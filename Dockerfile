FROM node:20-alpine

# Install bash untuk hardhat/ts-node
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy seluruh file ke dalam container
COPY . .

# Install dependencies di root
RUN npm install

# Kalau ada file package.json di server/, install juga
WORKDIR /app/server
RUN if [ -f package.json ]; then npm install; fi

# Compile smart contracts
WORKDIR /app
RUN npx hardhat compile

# Expose port backend
EXPOSE 4000

# Jalankan backend
CMD ["npx", "ts-node", "server/server.ts"]