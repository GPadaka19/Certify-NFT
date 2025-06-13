import { ethers, providers } from 'ethers'
import dotenv from 'dotenv'
import abi from '../../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json'

dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS || ''
const privateKey = process.env.PRIVATE_KEY || ''
const rpcUrl = process.env.SEPOLIA_RPC_URL || ''

console.log('🚀 === MINTSERVICE.TS LOADED ===')
console.log('Contract Address:', contractAddress)
console.log('RPC URL:', rpcUrl)
console.log('Private Key length:', privateKey.length)
console.log('===================================')

const provider = new providers.JsonRpcProvider(rpcUrl)

const wallet = new ethers.Wallet(privateKey, provider)
const contract = new ethers.Contract(contractAddress, abi.abi, wallet)

// Helper function to validate Ethereum address without ENS resolution
function isValidEthereumAddress(address: string): boolean {
  // Check if it's a valid hex string with 0x prefix and 40 hex characters
  const addressRegex = /^0x[a-fA-F0-9]{40}$/
  return addressRegex.test(address)
}

export async function mintCertificate(
  to: string,
  tokenURI: string,
  certificateType: string
): Promise<string> {
  console.log('🔥 === MINT CERTIFICATE FUNCTION CALLED ===')
  console.log('Arguments received:', arguments)
  console.log('to:', to, typeof to)
  console.log('tokenURI:', tokenURI, typeof tokenURI)
  console.log('certificateType:', certificateType, typeof certificateType)
  console.log('=============================================')
  
  try {
    // Force validation
    if (to === 'mint') {
      console.error('🚨 FOUND THE BUG: to parameter is "mint"!')
      throw new Error('Parameter "to" cannot be "mint" - it must be an Ethereum address')
    }

    // Use our custom validation function instead of ethers.utils.isAddress()
    if (!isValidEthereumAddress(to)) {
      console.error('🚨 Invalid address:', to)
      throw new Error(`Invalid Ethereum address: ${to}`)
    }

    console.log('✅ Validation passed, calling contract.mint()...')
    
    const tx = await contract["mint(address,string,string)"](to, tokenURI, certificateType)
    await tx.wait()

    console.log(`✅ Minted NFT to ${to} with tx hash: ${tx.hash}`)
    return tx.hash
  } catch (err) {
    console.error('❌ === MINT ERROR ===')
    console.error('Error:', err)
    console.error('Error type:', typeof err)
    console.error('Error constructor:', err?.constructor?.name)
    if (err instanceof Error) {
      console.error('Error message:', err.message)
      console.error('Error stack:', err.stack)
    }
    console.error('==================')
    
    throw err
  }
}

// Test function untuk debug
export function testMintService() {
  console.log('🧪 Test MintService called')
  return 'MintService is working'
}