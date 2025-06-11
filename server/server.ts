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
  res.send('Certify-NFT backend is running ✅')
})

app.use('/api/certificate', queryRoutes)
app.use('/api/certificate', verifyRoutes)
app.use('/api/certificate', uploadRoutes)
app.use('/api/certificate', mintRoutes)

const PORT = process.env.PORT || 4000
app.listen(Number(PORT), () =>
  console.log(`Server running on port http://localhost:${PORT}`)
)