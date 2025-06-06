# Certify-NFT - MVP Development Tasks (Updated)

## PHASE 1: SMART CONTRACT

1. **Initialize Hardhat project**

   * Command: `npx hardhat init` (TypeScript)
   * Test: `hardhat.config.ts` exists
   * Output: Basic project structure

2. **Create CertificateNFT.sol skeleton**

   * Code: Basic ERC721 contract (OpenZeppelin)
   * Add: AccessControl for issuer roles (instead of manual `onlyIssuer`)
   * Test: Contract compiles without errors

3. **Add mint function with issuer restriction**

   * Add: `onlyRole(ISSUER_ROLE)` modifier
   * Add: `mintCertificate(address to, string memory tokenURI)`
   * Add: `revokeCertificate(uint256 tokenId)`
   * Test: Role-based minting and revocation works as expected

4. **Deploy to Polygon Sepolia testnet**

   * Script: `scripts/deploy.ts`
   * Test: Contract visible on PolygonScan

## PHASE 2: BACKEND

1. **Setup Express server**

   * Init: `npm init -y`
   * Install: `express`, `ethers`, `axios`, `dotenv`, `cors`, `helmet`, `express-rate-limit`
   * Test: Server runs on port `8081`

2. **Create IPFS upload service**

   * File: `services/ipfsService.ts`
   * Method: `uploadToIPFS(metadata: JSON): Promise<string>`
   * Use: Web3.Storage or NFT.Storage
   * Test: Returns valid CID link

3. **Implement mint endpoint**

   * Route: `POST /api/mint`
   * Body: `{ recipientAddress, certificateData }`
   * Steps:

     * Upload metadata to IPFS
     * Call smart contract `mintCertificate`
   * Test: Returns transaction hash or tokenId

4. **Optional: PostgreSQL integration**

   * Store mapping wallet ↔ email (if available)
   * Cache certificate metadata
   * Maintain issuer authorization audit log

## PHASE 3: FRONTEND

1. **Create Next.js app**

   * Command: `npx create-next-app@latest`
   * Test: Dev server on port `3004`

2. **Add wallet connection**

   * Component: `WalletConnector`
   * Library: `wagmi`, `RainbowKit`
   * Test: Connects with MetaMask or WalletConnect

3. **Build certificate display UI**

   * Component: `CertificateCard`
   * Pull metadata from IPFS via tokenURI
   * Test: NFT info (name, description, image, attributes) rendered

4. **Admin issuance form**

   * Page: `/admin`
   * Auth: Wallet address signed message
   * Fields: recipient, metadata input, submit button
   * Test: Only issuer wallet can mint

## PHASE 4: INTEGRATION

1. **Connect frontend to smart contract**

   * Use: Contract address from `.env`
   * Use wagmi contract read/write hooks
   * Test: Displays user certificates by wallet

2. **Implement verification page**

   * Page: `/verify/[tokenId].tsx`
   * Input: tokenId or QR scan
   * Query: The Graph to verify ownership and status
   * Test: Displays valid/invalid with metadata info

3. **Setup CI/CD (optional)**

   * File: `.github/workflows/deploy.yml`
   * Includes: Build, lint, test, deploy steps
   * Test: Auto-deploy to VPS on push to `main`

---

# Deployment Model

* **Frontend**: Next.js static build (port 3004)
* **Backend**: Node.js Express API (port 8081)
* **Database**: Optional PostgreSQL container
* **Smart Contract**: Deployed to Polygon Sepolia
* **IPFS**: NFT.Storage or Web3.Storage
* **Indexing**: The Graph subgraph

---

This structure ensures modular, secure, and scalable development with blockchain and Web3 best practices.