import express, { Request, RequestHandler, Response } from 'express'
import multer from 'multer'
import { uploadToIPFS } from '../services/ipfsService'
import { getCertificatesByOwner } from '../services/certificateService'

const router = express.Router()
const upload = multer()

const uploadHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body
    const file = (req as any).file

    if (!name || !description || !file) {
      res.status(400).json({ error: 'Missing name, description, or image file' })
      return
    }

    const imageCid = await uploadToIPFS(file.buffer)
    const metadata = { 
      name,
      description,
      image: `ipfs://${imageCid}` 
    }
    const metadataCid = await uploadToIPFS(JSON.stringify(metadata))
    const tokenURI = `ipfs://${metadataCid}`

    res.json({ tokenURI })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Upload failed' })
  }
}

const getCertificatesHandler = async (req: Request, res: Response) => {
  try {
    const { address } = req.params
    if (!address) {
      return res.status(400).json({ error: 'Missing address parameter' })
    }
    const certificates = await getCertificatesByOwner(address)
    return res.json({ certificates })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch certificates' })
  }
}

router.post('/upload', upload.single('image'), uploadHandler)
// router.get('/:address', getCertificatesHandler) // FIXME: Add this route

export default router