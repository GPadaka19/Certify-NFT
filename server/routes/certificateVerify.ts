import express, { Request, Response } from 'express'
import { verifyCertificate } from '../services/verifyService'

const router = express.Router()

router.get('/verify', async (req: Request, res: Response): Promise<void> => {
  const { address, tokenId } = req.query

  if (!address || !tokenId) {
    res.status(400).json({ error: 'Missing address or tokenId' })
    return
  }

  try {
    const result = await verifyCertificate(address as string, tokenId as string)
    res.json(result)
  } catch (err) {
    console.error('Verification failed:', err)
    res.status(500).json({ error: 'Verification failed' })
    return
  }
})

export default router