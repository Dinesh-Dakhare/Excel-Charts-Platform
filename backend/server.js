import express from 'express'
import connectDb from './db/db.js'
import cors from 'cors'
import { config } from 'dotenv'
import router from './routes/authRoutes.js'
config()


const app = express()

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth',router)


// MongoDB connection
connectDb()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
