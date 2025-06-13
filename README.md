# Certify-NFT Backend

Backend service for Certify-NFT, a decentralized certificate verification system built on Ethereum Sepolia network.

## Features

- Certificate minting and verification
- IPFS integration for metadata storage
- Smart contract interaction
- RESTful API endpoints

## Prerequisites

- Node.js (v20)
- npm or yarn
- Access to Sepolia testnet
- Web3.Storage account for IPFS

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
SEPOLIA_RPC_URL=your_sepolia_rpc_url
CONTRACT_ADDRESS=your_contract_address
WEB3_STORAGE_TOKEN=your_web3_storage_token
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Certify-NFT-BE.git
cd Certify-NFT-BE
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

## Useful Commands

### Development
```bash
# Run server with TypeScript
npx ts-node server/server.ts

# Run server with nodemon for auto-reload
npx nodemon --exec ts-node server/server.ts

# Build TypeScript
npm run build

# Run tests
npm test
```

### Debugging
```bash
# Check server health
curl http://localhost:4000/api/health

# Test certificate verification
curl "http://localhost:4000/api/certificate/verify?address=0xaccB5E0993c482c95a0Cc4ed33958Fc689fa55D6&tokenId=0"

# Test certificate minting
curl -X POST http://localhost:4000/api/certificate/mint \
  -H "Content-Type: application/json" \
  -d '{"to":"0xaccB5E0993c482c95a0Cc4ed33958Fc689fa55D6","tokenURI":"ipfs://your_metadata_uri"}'

# Test certificate upload
curl -X POST http://localhost:4000/api/certificate/upload \
  -F "file=@/path/to/certificate.pdf" \
  -F "metadata={\"name\":\"Test Certificate\",\"description\":\"Test Description\"}"
```

### Environment Setup
```bash
# Create .env file
cp .env.example .env

# Check environment variables
echo $SEPOLIA_RPC_URL
echo $CONTRACT_ADDRESS
echo $WEB3_STORAGE_TOKEN
```

### Smart Contract Interaction
```bash
# Get contract ABI
cat artifacts/contracts/CertificateNFT.sol/CertificateNFT.json | jq '.abi'

# Check contract address
echo $CONTRACT_ADDRESS

# Verify contract on Etherscan
npx hardhat verify --network sepolia $CONTRACT_ADDRESS

# Compile smart contract
npx hardhat compile

# Clean compiled artifacts
npx hardhat clean
```

## API Endpoints

### Health Check
- `GET /api/health`
  - Returns the health status of the server and its dependencies

### Certificate Verification
- `GET /api/certificate/verify?address={address}&tokenId={tokenId}`
  - Verifies if a certificate is valid for the given address and token ID

### Certificate Minting
- `POST /api/certificate/mint`
  - Mints a new certificate NFT
  - Request body:
    ```json
    {
      "to": "recipient_address",
      "tokenURI": "ipfs://your_metadata_uri"
    }
    ```

### Certificate Upload
- `POST /api/certificate/upload`
  - Uploads certificate metadata to IPFS
  - Request body: Form data with certificate details

## Smart Contract

The project uses a custom ERC721 smart contract deployed on Sepolia testnet. The contract includes:
- Certificate minting
- Ownership verification
- Token URI management

## Development

### Running Tests
```bash
npm test
```

### Building
```bash
npm run build
```

## Error Handling

The API implements comprehensive error handling for:
- Invalid Ethereum addresses
- Contract interaction failures
- IPFS upload issues
- Network connectivity problems

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
