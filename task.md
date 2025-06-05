# MVP Development Tasks

## PHASE 1: SMART CONTRACT

1. Initialize Hardhat project
- Command: npx hardhat init (TypeScript)
- Test: hardhat.config.ts exists
- Output: Basic project structure

2. Create CertificateNFT.sol skeleton
- Code: Basic ERC721 contract
- Test: Compiles without errors

3. Add mint function with issuer restriction
- Add: onlyIssuer modifier
- Add: mint() with tokenURI
- Test: Verify mint restriction

4. Deploy to Mumbai testnet
- Script: deploy.js
- Test: Contract on PolygonScan

## PHASE 2: BACKEND

1. Setup Express server
- Init: npm init -y
- Install: express, ethers, axios
- Test: Server runs on port 4000

2. Create IPFS upload service
- File: services/ipfsService.ts
- Method: uploadToIPFS()
- Test: Returns valid CID

3. Implement mint endpoint
- Route: POST /api/mint
- Test: Successful mint transaction

## PHASE 3: FRONTEND

1. Create Next.js app
- Command: npx create-next-app
- Test: Dev server runs

2. Add wallet connection
- Component: WalletConnector
- Library: wagmi.sh
- Test: Connects to MetaMask

3. Build certificate display
- Component: CertificateCard
- Test: Shows NFT metadata

## PHASE 4: INTEGRATION

1. Connect frontend to contract
- Environment: NEXT_PUBLIC_CONTRACT_ADDRESS
- Test: Displays user's certificates

2. Implement verification
- Page: /verify/[id].tsx
- Test: Shows valid/invalid status

3. Setup CI/CD (optional)
- File: .github/workflows/deploy.yml
- Test: Auto-deploys on push