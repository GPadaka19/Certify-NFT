# Certify-NFT - System Architecture (Updated)

## Project Folder Structure

```
project-root/
│
├── client/                  # Frontend (Next.js)
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI Components (WalletConnector, CertificateCard, etc.)
│   │   ├── pages/           # Routes (/, /verify/[id], /admin)
│   │   ├── utils/           # Helper functions
│   │   └── contexts/        # React contexts (wallet state)
│   └── package.json
│
├── server/                  # Backend (Node.js/Express)
│   ├── routes/              # API routes
│   ├── services/            # IPFS, contract, DB integrations
│   ├── controllers/         # API logic
│   ├── middleware/          # Auth, rate-limiting, CORS
│   ├── config/              # Env and key configs
│   ├── app.ts               # Entry point
│   └── package.json
│
├── contracts/               # Smart Contracts (Solidity)
│   ├── CertificateNFT.sol   # ERC721 with AccessControl, revoke
│   ├── scripts/             # Deployment and setup scripts
│   └── artifacts/           # Compiled contracts
│   
│
├── subgraph/                # The Graph indexer
│   ├── schema.graphql       # Certificate entity schema
│   ├── subgraph.yaml        # Config
│   └── mappings.ts          # Event handlers
│
├── .github/workflows/       # CI/CD workflows
│   └── deploy.yml
│
├── docker-compose.yml       # Container orchestration
├── README.md
└── architecture.md
```

---

## Components Overview

### 1. Frontend (Next.js)

* Connect wallet (RainbowKit + wagmi)
* Display certificate NFTs with metadata
* QR-based and tokenId verification UI
* Admin page for certificate issuance (with wallet-based auth)

### 2. Backend (Express)

* REST API (mint, upload, verify)
* Upload metadata to IPFS (via Web3.Storage/NFT.Storage)
* Interact with smart contract (mint/revoke)
* Optional: connect to PostgreSQL for user/email mapping and audit logs
* Security: CORS, Helmet, Rate limiting, Signed wallet message auth

### 3. Smart Contracts (Solidity)

* ERC721 (OpenZeppelin)
* Role-based access control (ISSUER\_ROLE)
* mintCertificate and revokeCertificate functions
* Emits `CertificateMinted` and `CertificateRevoked` events

### 4. The Graph

* Index `CertificateMinted` and `CertificateRevoked`
* Query certificates by owner, issuer, status
* Used for `/verify/[tokenId]` and listing user certs

### 5. PostgreSQL (Optional)

* Map user wallet to metadata (e.g., email)
* Cache token metadata
* Store audit log of mint/revoke actions

---

## Data Flow

### Certificate Issuance

1. Admin fills form in frontend
2. Frontend calls backend `/api/mint`
3. Backend:

   * Uploads metadata to IPFS
   * Calls `mintCertificate` on smart contract
4. The Graph indexes event
5. Frontend fetches certs from The Graph

### Certificate Verification

1. User opens `/verify/[tokenId]`
2. Frontend fetches metadata from tokenURI
3. Queries The Graph for issuer/ownership
4. Displays valid/invalid with cert info

---

## Deployment Model

* **Frontend**: Next.js static export, port 3004
* **Backend**: Node.js Express, port 8081
* **Database**: PostgreSQL (local or managed)
* **Blockchain**: Polygon Sepolia
* **IPFS**: NFT.Storage/Web3.Storage
* **The Graph**: Hosted subgraph deployment

---

This architecture is built for flexibility and future scaling. It supports multiple issuers, secure minting, user-friendly verification, and strong data integrity through blockchain and IPFS.