import { Schema, model, mongoose } from 'mongoose'

const ChartDataSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  size: {
    type: String, // in bytes
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },

  chartType: {
    type: String,
    enum: ['bar', 'line', 'pie', 'doughnut', 'polarArea', 'radar', 'bubble'],
    required: true,
  },
  headers: [String], // xField and yField headers
  rows: [[mongoose.Schema.Types.Mixed]], // flexible for numeric, string, or mixed data
  options: {
    type: mongoose.Schema.Types.Mixed, // Store additional chart config (like color, labels, etc.)
    default: {},
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const Charts = model('Chart', ChartDataSchema)
