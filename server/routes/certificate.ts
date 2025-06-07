import express, { RequestHandler } from 'express'
import multer from 'multer'
import { uploadToIPFS } from '../services/ipfsService'

const router = express.Router()
const upload = multer() // memory storage

const uploadHandler: RequestHandler = async (req, res) => {
  try {
    const { name, description } = req.body
    const file = (req as any).file

    if (!name || !description || !file) {
      res.status(400).json({ error: 'Missing name, description, or image file' })
      return
    }

    // Upload image file ke IPFS
    const imageCid = await uploadToIPFS(file.buffer)

    // Buat metadata JSON
    const metadata = {
      name,
      description,
      image: `ipfs://${imageCid}`
    }

    // Upload metadata JSON ke IPFS
    const metadataCid = await uploadToIPFS(JSON.stringify(metadata))

    const tokenURI = `ipfs://${metadataCid}`

    res.json({ tokenURI })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Upload failed' })
  }
}

router.post('/upload', upload.single('image'), uploadHandler)

export default router