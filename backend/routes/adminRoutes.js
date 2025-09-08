import express from 'express'
import { deleteUserCharts, deleteUserData, getLatestChart, getUserCharts, getUserData } from '../controllers/adminController.js'
import adminprotected from '../middleware/adminprotected.js'
import authenticateToken from '../middleware/protected.js'

const admin = express.Router()

admin.get('/userData',authenticateToken,adminprotected,getUserData)
admin.delete('/user/:id',authenticateToken,adminprotected,deleteUserData)
admin.get('/user-charts/:id',authenticateToken,adminprotected,getUserCharts)
admin.delete('/charts/:id',authenticateToken,adminprotected,deleteUserCharts)
admin.get('/chart-latest',authenticateToken,adminprotected,getLatestChart)
export default admin