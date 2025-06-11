import express from 'express'
import cors from 'cors'
import queryRoutes from './routes/certificateQuery'
import verifyRoutes from './routes/certificateVerify'
import uploadRoutes from './routes/certificateUpload'
import mintRoutes from './routes/mint'
import healthRoutes from './routes/health'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Certify-NFT backend is running ✅",
    usage: {
      upload: "POST /api/certificate/upload → Upload image & metadata",
      mint: "POST /api/certificate/mint → Mint certificate",
      view: "GET /api/certificate/:address → View certificates",
      verify: "GET /api/certificate/verify?address=...&tokenId=... → Verify",
      health: "GET /api/certificate/health → Check service health"
    }
  })
})

// API Routes
app.use('/api/certificate', healthRoutes) // Health check should be first
app.use('/api/certificate', uploadRoutes)
app.use('/api/certificate', mintRoutes)
app.use('/api/certificate', queryRoutes)
app.use('/api/certificate', verifyRoutes)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})