import express, { Request, Response } from 'express'
import { verifyCertificate } from '../services/verifyService'

const router = express.Router()

router.get('/verify', async (req: Request, res: Response): Promise<void> => {
  console.log('=== VERIFY ENDPOINT HIT ===')
  console.log('Query params:', req.query)
  
  const { address, tokenId } = req.query
  
  if (!address || !tokenId) {
    res.status(400).json({ 
      error: 'Missing required parameters',
      details: 'Both address and tokenId are required'
    })
    return
  }
  
  try {
    const result = await verifyCertificate(address as string, tokenId as string)
    
    if (!result.isValid) {
      res.status(404).json({
        error: 'Certificate verification failed',
        details: result.error
      })
      return
    }

    res.status(200).json(result)
  } catch (err) {
    console.error('Verification failed:', err)
    res.status(500).json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error occurred'
    })
  }
})

export default router