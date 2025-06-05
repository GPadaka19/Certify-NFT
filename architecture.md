# Certificate Verification Web3 App - Architecture

## File & Folder Structure

project-root/
│
├── client/                  # Frontend (Next.js)
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # State contexts
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── server/                  # Backend (Node.js/Express)
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── app.ts
│   └── package.json
│
├── contracts/               # Smart Contracts
│   ├── CertificateNFT.sol
│   ├── artifacts/
│   └── scripts/
│
├── .github/workflows/       # CI/CD (optional)
│   └── deploy.yml
│
├── docker-compose.yml
├── README.md
└── architecture.md

## System Components

1. Frontend (Next.js):
- Wallet connection
- Certificate display
- Verification UI

2. Backend (Express):
- API routes
- IPFS upload service
- Blockchain interaction

3. Blockchain Layer:
- ERC721 Smart Contract
- Polygon Mumbai testnet
- The Graph indexing

## Service Connections

Frontend → Backend → IPFS → Blockchain
Frontend ← The Graph ← Blockchain


⸻

## What Each Part Does

### Frontend (Next.js)
- Handles user authentication via wallet connection (MetaMask, WalletConnect)
- Displays certificate NFTs with verification status
- Provides UI for issuing new certificates (admin-only)

### Backend (Node.js/Express)
- Processes API requests from frontend
- Manages IPFS uploads of certificate metadata
- Interfaces with blockchain via Alchemy RPC
- Implements rate limiting and basic auth

### Smart Contracts (Solidity)
- ERC721 contract manages certificate NFTs
- Stores immutable certificate metadata hashes
- Implements issuer whitelisting and revocation

### The Graph
- Indexes blockchain events (minting, transfers)
- Enables efficient querying of certificates by owner/issuer
- Provides historical data for verification

### PostgreSQL (external)
- Stores user profiles (optional email/wallet mapping)
- Caches frequently accessed certificate data
- Maintains issuer authorization records

## Where State Lives
- Blockchain: Permanent certificate records (token ownership, metadata URIs)
- IPFS: Immutable certificate metadata (JSON files)
- PostgreSQL: Ephemeral user data and cache
- Frontend: Session state (connected wallet, UI preferences)

## How Services Connect
- User auth: Frontend ↔ Wallet ↔ Backend (signed messages)
- Certificate issuance: Frontend → Backend → IPFS → Smart Contract
- Verification: Frontend ↔ The Graph ↔ Smart Contract
- Data caching: Backend ↔ PostgreSQL (optional)

## Deployment Model
- Single VPS deployment (Docker containers)
- Frontend: Static Next.js build (port 3000)
- Backend: Node process (port 4000)
- Database: Managed PostgreSQL (external/container)
- Blockchain: Polygon Mumbai via Alchemy RPC
⸻

This architecture ensures modularity, scalability, and clear separation of concerns between frontend, backend, and database.