import express from 'express'
import { chartCreated, chartUpload, deleteChart, getAllData, getHistory } from '../controllers/chartController.js'
import authenticateToken from '../middleware/protected.js'

const charts = express.Router()

charts.post('/upload',authenticateToken,chartUpload)
charts.get('/history',authenticateToken,getHistory)
charts.get('/chart-created',authenticateToken,chartCreated)
charts.get('/chart-data',authenticateToken,getAllData)
charts.delete('/:id',deleteChart)
export default charts