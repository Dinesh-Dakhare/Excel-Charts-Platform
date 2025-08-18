import express from 'express'
import { chartCreated, chartDownload, chartUpload, deleteChart, getAllData, getData, getHistory } from '../controllers/chartController.js'
import authenticateToken from '../middleware/protected.js'

const charts = express.Router()

charts.post('/upload',authenticateToken,chartUpload)
charts.get('/history',authenticateToken,getHistory)
charts.get('/chart-created',authenticateToken,chartCreated)
charts.get('/chart-data',authenticateToken,getAllData)
charts.get('/:id',authenticateToken,getData)
charts.delete('/:id',deleteChart)
charts.patch('/download',authenticateToken,chartDownload)
export default charts