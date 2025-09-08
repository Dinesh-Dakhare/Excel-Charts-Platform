import express from 'express'
import connectDb from './db/db.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
import { config } from 'dotenv'
import router from './routes/authRoutes.js'
import charts from './routes/chartRoutes.js'
import admin from './routes/adminRoutes.js';
import aisummary from './routes/aisummaryRoutes.js';
config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); 
app.use('/api/v1/auth',router)
app.use('/api/v1/chart',charts)
app.use('/api/v1/ai',aisummary)

app.use('/api/v1/admin',admin)
// MongoDB connection
connectDb()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
