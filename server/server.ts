import express from 'express'
import issueRoutes from './routes/certificateIssue'
import queryRoutes from './routes/certificateQuery'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Certify-NFT backend is running ✅')
})

app.use('/api/certificate', issueRoutes)
app.use('/api/certificate', queryRoutes)

const PORT = process.env.PORT || 4000
app.listen(Number(PORT), () =>
  console.log(`Server running on port http://localhost:${PORT}`)
)