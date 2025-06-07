import express from 'express'
import { uploadToIPFS } from '../services/ipfsService'

const router = express.Router()

router.post('/upload', async (req, res) => {
  try {
    const metadata = JSON.stringify(req.body) // pastikan body-parser aktif
    const cid = await uploadToIPFS(metadata)
    res.json({ cid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

export default router