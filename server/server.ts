import express from 'express'
import certificateRoutes from './routes/certificate'
import mintRoutes from './routes/mint'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Certify-NFT backend is running ✅')
})

app.use('/api/certificate', certificateRoutes)
app.use('/api/mint', mintRoutes)

const PORT = process.env.PORT || 4000
app.listen(Number(PORT), () => console.log(`Server running on port http://localhost:${PORT}`))