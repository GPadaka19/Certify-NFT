import { ethers } from 'ethers'
import dotenv from 'dotenv'
import abi from '../../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json'

dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS!
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL)
const contract = new ethers.Contract(contractAddress, abi.abi, provider)

export async function verifyCertificate(address: string, tokenId: string) {
  try {
    const owner = await contract.ownerOf(tokenId)
    const tokenURI = await contract.tokenURI(tokenId)

    const isValidOwner = owner.toLowerCase() === address.toLowerCase()

    const metadataRes = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
    const metadata = await metadataRes.json()

    return {
      tokenId,
      owner,
      isValidOwner,
      tokenURI,
      metadata
    }
  } catch (err) {
    throw new Error('Invalid tokenId or tokenURI')
  }
}