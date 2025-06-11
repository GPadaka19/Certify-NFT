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
    
    if (!certificates || certificates.length === 0) {
      res.status(404).json({ 
        error: 'No certificates found',
        address 
      })
      return
    }

    res.status(200).json({ certificates })
  } catch (err) {
    console.error('Query failed:', err)
    if (err instanceof Error) {
      if (err.message.includes('invalid address')) {
        res.status(400).json({ 
          error: 'Invalid address format',
          details: err.message 
        })
        return
      }
      if (err.message.includes('network')) {
        res.status(503).json({
          error: 'Blockchain network unavailable',
          details: err.message
        })
        return
      }
    }
    res.status(500).json({ error: 'Failed to fetch certificates' })
  }
})

export default router