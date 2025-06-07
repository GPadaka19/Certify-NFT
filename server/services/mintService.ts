import { ethers } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS || ''
const privateKey = process.env.PRIVATE_KEY || ''
const rpcUrl = process.env.SEPOLIA_RPC_URL || ''

// ABI bisa diganti dengan hasil compile dari Hardhat jika tersedia
import abi from '../../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json'

const provider = new ethers.JsonRpcProvider(rpcUrl)
const wallet = new ethers.Wallet(privateKey, provider)
const contract = new ethers.Contract(contractAddress, abi.abi, wallet)

export async function mintCertificate(to: string, tokenURI: string): Promise<string> {
  try {
    const tx = await contract.mint(to, tokenURI)
    await tx.wait()
    return tx.hash
  } catch (err) {
    console.error('Minting failed:', err)
    throw new Error('Minting certificate failed')
  }
}