import express, { Request, Response } from 'express'
import multer from 'multer'
import { mintCertificate } from '../services/mintService'

const router = express.Router()
const upload = multer()

// POST /api/certificate/mint
router.post('/mint', upload.none(), async (req: Request, res: Response): Promise<void> => {
  console.log('🔍 === ROUTES/MINT.TS DEBUG ===')
  console.log('Full request body:', req.body)
  console.log('Request headers:', req.headers['content-type'])
  console.log('===============================')

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
    console.error('❌ === MINTING ERROR IN ROUTES ===')
    console.error('Error:', error)
    console.error('Error type:', typeof error)
    console.error('Error message:', (error as Error).message)
    console.error('Error stack:', (error as Error).stack)
    console.error('==================================')

    res.status(500).json({
      error: 'Minting failed',
      details: error instanceof Error ? error.message : String(error),
    })
  }
})

export default router