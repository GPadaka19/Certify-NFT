import { ethers } from 'ethers'
import dotenv from 'dotenv'
import abi from "../../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json"

dotenv.config()

// Debug logging
console.log('=== VERIFY SERVICE INITIALIZATION ===')
console.log('Contract Address:', process.env.CONTRACT_ADDRESS)
// console.log('RPC URL:', process.env.SEPOLIA_RPC_URL)
console.log('ABI loaded:', !!abi.abi)
console.log('===================================')

const contractAddress = process.env.CONTRACT_ADDRESS!
const rpcUrl = process.env.SEPOLIA_RPC_URL!

// Initialize provider with proper network configuration for Sepolia Ethereum
const provider = new ethers.providers.StaticJsonRpcProvider(rpcUrl, {
  name: 'sepolia',
  chainId: 11155111, // Sepolia Ethereum chainId
  ensAddress: null // Disable ENS
}as any)

// Test provider connection
provider.getNetwork().then(network => {
  console.log('Connected to network:', network)
  if (network.chainId !== 11155111) {
    console.error('Warning: Connected to wrong network. Expected Sepolia (11155111) but got:', network.chainId)
  }
}).catch(error => {
  console.error('Provider connection error:', error)
})

// Initialize contract
const contract = new ethers.Contract(contractAddress, abi.abi, provider)
console.log('Contract methods:', Object.keys(contract).filter(k => typeof contract[k] === 'function'))

export async function verifyCertificate(address: string, tokenId: string) {
  try {
    console.log(`Verifying certificate - Address: ${address}, TokenId: ${tokenId}`)
    const isValidAddress = ethers.utils.isAddress(address)
    console.log('Is valid Ethereum address:', isValidAddress)
    
    // Validate address format
    if (!ethers.utils.isAddress(address)) {
      throw new Error(`Invalid Ethereum address format: ${address}`)
    }

    // Convert tokenId to number if it's a string
    const numericTokenId = typeof tokenId === 'string' ? parseInt(tokenId, 10) : tokenId
    
    // Check if certificate is valid for this address
    console.log('Calling contract.verify with:', address, numericTokenId)
    const isValid = await contract.verify(address, numericTokenId)
    console.log(`Verification result: ${isValid}`)
    
    if (!isValid) {
      return {
        isValid: false,
        error: 'Certificate is not valid for this address'
      }
    }

    // Get tokenURI
    const tokenURI = await contract.tokenURI(numericTokenId)
    console.log(`TokenURI: ${tokenURI}`)

    // Fetch metadata from IPFS
    let metadata = null
    if (tokenURI) {
      try {
        const ipfsUrl = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        console.log(`Fetching metadata from: ${ipfsUrl}`)
        
        const metadataRes = await fetch(ipfsUrl)
        if (metadataRes.ok) {
          metadata = await metadataRes.json()
          console.log('Metadata retrieved successfully')
        }
      } catch (metadataError) {
        console.log('Error fetching metadata:', metadataError)
      }
    }

    return {
      isValid: true,
      tokenId: numericTokenId,
      address,
      tokenURI,
      metadata
    }
  } catch (err) {
    console.error('Verification error:', err)
    if (err instanceof Error) {
      if (err.message.includes('invalid token ID')) {
        return {
          isValid: false,
          error: 'Invalid token ID'
        }
      }
      if (err.message.includes('invalid address')) {
        return {
          isValid: false,
          error: 'Invalid Ethereum address'
        }
      }
      if (err.message.includes('network')) {
        return {
          isValid: false,
          error: 'Blockchain network unavailable'
        }
      }
      return {
        isValid: false,
        error: err.message
      }
    }
    return {
      isValid: false,
      error: 'Unknown verification error occurred'
    }
  }
}