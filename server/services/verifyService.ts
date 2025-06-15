import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.SEPOLIA_RPC_URL!;
const contractAddress = process.env.CONTRACT_ADDRESS!;
const abi = [
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)'
];

const provider = new ethers.JsonRpcProvider(rpcUrl);
const contract = new ethers.Contract(contractAddress, abi, provider);

export async function verifyCertificateOwnership(
  address: string,
  tokenId: string
): Promise<{
  valid: boolean;
  message?: string;
  data?: any;
}> {
  try {
    const owner = await contract.ownerOf(tokenId);

    if (owner.toLowerCase() !== address.toLowerCase()) {
      return {
        valid: false,
        message: 'Address does not own the token',
      };
    }

    const tokenURI = await contract.tokenURI(tokenId);

    // Ambil metadata dari IPFS atau URL lain
    const metadataRes = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
    const metadata = await metadataRes.json();

    return {
      valid: true,
      data: {
        valid: true,
        tokenId,
        address,
        tokenURI,
        metadata,
      },
    };
  } catch (err: any) {
    return {
      valid: false,
      message: err.reason || err.message,
    };
  }
}