import { expect } from "chai";
import { ethers } from "hardhat";

describe("CertificateNFT", function () {
  it("Should compile without errors", async function () {
    const CertificateNFT = await ethers.getContractFactory("CertificateNFT");
    const certificateNFT = await CertificateNFT.deploy();
    await certificateNFT.waitForDeployment();
    expect(certificateNFT).to.be.ok;
  });

  it("Should only allow issuer to mint", async function () {
    const [issuer, other] = await ethers.getSigners();
    const CertificateNFT = await ethers.getContractFactory("CertificateNFT");
    const certificateNFT = await CertificateNFT.connect(issuer).deploy();
    await certificateNFT.waitForDeployment();

    // Issuer can mint
    await expect(
      certificateNFT.connect(issuer).mint(issuer.address, 1, "ipfs://testuri")
    ).to.not.be.reverted;

    // Other cannot mint
    await expect(
      certificateNFT.connect(other).mint(other.address, 2, "ipfs://testuri2")
    ).to.be.revertedWith("Not authorized: issuer only");
  });
}); 