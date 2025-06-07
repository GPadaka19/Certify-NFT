import express, { RequestHandler } from 'express'
import { mintCertificate } from '../services/mintService'

const router = express.Router()

const mintHandler: RequestHandler = async (req, res) => {
  try {
    const { to, tokenURI } = req.body
    if (!to || !tokenURI) {
      res.status(400).json({ error: 'Missing to or tokenURI' })
      return
    }

    const txHash = await mintCertificate(to, tokenURI)
    res.json({ txHash })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Minting failed' })
  }
}

router.post('/', mintHandler)

export default router