import express, { Request, Response } from 'express'
import { getCertificatesByOwner } from '../services/certificateService'

const router = express.Router()

router.get('/:address', async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params
    if (!address) {
      res.status(400).json({ error: 'Missing address parameter' })
      return
    }

    const certificates = await getCertificatesByOwner(address)
    res.json({ certificates })
    return
  } catch (err) {
    console.error('Query failed:', err)
    res.status(500).json({ error: 'Failed to fetch certificates' })
  }
})

export default router