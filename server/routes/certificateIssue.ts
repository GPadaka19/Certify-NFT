import express, { Request, Response } from 'express'
import multer from 'multer'
import { uploadToIPFS } from '../services/ipfsService'
import { mintCertificate } from '../services/mintService'

const router = express.Router()
const upload = multer() // memory storage

// POST /api/certificate/issue
router.post('/issue', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, to } = req.body
    const file = (req as any).file

    const missingFields: string[] = []
    if (!name) missingFields.push('name')
    if (!description) missingFields.push('description')
    if (!to) missingFields.push('to')
    if (!file) missingFields.push('image')

    if (missingFields.length > 0) {
      res.status(400).json({
        error: 'Missing required fields',
        missing: missingFields
      })
      return
    }

    // 1. Upload image to IPFS
    const imageCid = await uploadToIPFS(file.buffer)

    // 2. Create metadata
    const metadata = {
      name,
      description,
      image: `ipfs://${imageCid}`
    }

    // 3. Upload metadata to IPFS
    const metadataCid = await uploadToIPFS(JSON.stringify(metadata))
    const tokenURI = `ipfs://${metadataCid}`

    // 4. Mint NFT to recipient
    const txHash = await mintCertificate(to, tokenURI, description) // description = certificateType

    res.json({ tokenURI, certificateType: description, txHash })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Issue certificate failed' })
  }
})

export default router