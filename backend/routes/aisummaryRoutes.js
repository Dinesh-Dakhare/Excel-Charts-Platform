import express from 'express'
import { generateSummary } from '../controllers/aisummaryController.js'

const aisummary = express.Router()

aisummary.post('/generate-summary',generateSummary)




export default aisummary