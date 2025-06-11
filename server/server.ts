import express from 'express'
import queryRoutes from './routes/certificateQuery'
import verifyRoutes from './routes/certificateVerify'
import uploadRoutes from './routes/certificateUpload'
import mintRoutes from './routes/mint'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: "Certify-NFT backend is running ✅",
    usage: {
      upload: "POST /api/certificate/upload → Upload image & metadata",
      mint: "POST /api/certificate/mint → Mint certificate",
      view: "GET /api/certificate/:address → View certificates",
      verify: "GET /api/certificate/verify?address=...&tokenId=... → Verify"
    }
  });
});

app.use('/api/certificate', verifyRoutes)
app.use('/api/certificate', queryRoutes)
app.use('/api/certificate', uploadRoutes)
app.use('/api/certificate', mintRoutes)

const PORT = process.env.PORT || 4000
app.listen(Number(PORT), () =>
  console.log(`Server running on port http://localhost:${PORT}`)
)