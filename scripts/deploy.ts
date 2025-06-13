import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CertificateNFT contract...");

  // Get the contract factory
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");

  // Deploy the contract
  const certificateNFT = await CertificateNFT.deploy();
  await certificateNFT.deployed();

  console.log("CertificateNFT deployed to:", certificateNFT.address);
  console.log("Transaction hash:", certificateNFT.deployTransaction.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 