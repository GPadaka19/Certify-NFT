import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CertificateNFT contract...");

  // Get the contract factory
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");

  // Deploy the contract
  const certificateNFT = await CertificateNFT.deploy();
  await certificateNFT.waitForDeployment();

  const address = await certificateNFT.getAddress();
  console.log("CertificateNFT deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 