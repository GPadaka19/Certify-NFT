import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");
  const contract = await CertificateNFT.deploy();
  await contract.waitForDeployment();

  console.log("CertificateNFT deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
