import { ethers } from 'ethers'
import dotenv from 'dotenv'
import abi from '../../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json'

dotenv.config()

const contractAddress = process.env.CONTRACT_ADDRESS!
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL)
const contract = new ethers.Contract(contractAddress, abi.abi, provider)

export async function verifyCertificate(address: string, tokenId: string) {
  try {
    console.log(`Verifying certificate - Address: ${address}, TokenId: ${tokenId}`)
    
    // Step 1: Cek apakah sertifikat valid untuk address ini
    const isValid = await contract.verify(address, tokenId)
    console.log(`Verification result: ${isValid}`)
    
    // Step 2: Dapatkan tokenURI - coba kedua fungsi
    let tokenURI: string
    try {
      tokenURI = await contract.tokenURI(tokenId)
      console.log(`TokenURI from tokenURI(): ${tokenURI}`)
    } catch (uriError) {
      console.log('tokenURI() failed, trying getTokenURI()...')
      try {
        tokenURI = await contract.getTokenURI(tokenId)
        console.log(`TokenURI from getTokenURI(): ${tokenURI}`)
      } catch (getUriError) {
        console.log('Both tokenURI methods failed:', { uriError, getUriError })
        return {
          tokenId,
          address,
          isValid,
          error: 'Could not retrieve token metadata',
          tokenURI: null,
          metadata: null,
        }
      }
    }
    
    // Step 3: Fetch metadata dari IPFS
    let metadata = null
    if (tokenURI) {
      try {
        const ipfsUrl = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        console.log(`Fetching metadata from: ${ipfsUrl}`)
        
        const metadataRes = await fetch(ipfsUrl)
        if (metadataRes.ok) {
          metadata = await metadataRes.json()
          console.log('Metadata retrieved successfully')
        } else {
          console.log('Failed to fetch metadata from IPFS')
        }
      } catch (metadataError) {
        console.log('Error fetching metadata:', metadataError)
      }
    }

    return {
      tokenId,
      address,
      isValid,
      tokenURI,
      metadata,
    }
  } 
  
  catch (err) {
    console.error('Verification error:', err)
    try {
      // Your existing contract call code here
    } catch (err: unknown) {
      // Type guard to check if err is an Error-like object
      if (err && typeof err === 'object') {
        const error = err as any; // Cast to any for property access
        
        // Check for specific error types
        if (error.reason === 'ERC721: invalid token ID') {
          return {
            valid: false,
            error: 'Invalid token ID'
          };
        }
        
        if (error.code === 'CALL_EXCEPTION') {
          return {
            valid: false,
            error: `Contract call failed: ${error.reason || 'Unknown error'}`
          };
        }
      }
      
      // Handle generic errors
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      return {
        valid: false,
        error: `Verification failed: ${errorMessage}`
      };
    }
  }
}