import express, { Request, Response } from 'express'
import { mintCertificate } from '../services/mintService'

const router = express.Router()

// POST /api/certificate/mint
router.post('/mint', async (req: Request, res: Response): Promise<void> => {
  try {
    const { to, tokenURI, certificateType } = req.body

    const errors: { [key: string]: string } = {}
    if (!to) errors.to = 'Missing recipient wallet address'
    if (!tokenURI) errors.tokenURI = 'Missing tokenURI (IPFS metadata)'
    if (!certificateType) errors.certificateType = 'Missing certificateType (e.g., Certificate of Completion)'

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        error: 'Validation failed',
        missingFields: errors,
      })
      return
    }

    const txHash = await mintCertificate(to, tokenURI, certificateType)

    res.status(200).json({
      message: 'Minting successful',
      to,
      tokenURI,
      certificateType,
      txHash,
    })
  } catch (error) {
    console.error('Minting failed:', error)
    res.status(500).json({
      error: 'Minting failed',
      details: error instanceof Error ? error.message : String(error),
    })
  }
})

export default router