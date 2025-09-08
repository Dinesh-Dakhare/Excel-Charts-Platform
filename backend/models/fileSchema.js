import { Schema, model } from 'mongoose'
const FileSchema = new Schema(
  {
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
    downloads:{
type: Number,
default: 0
    },
    totalCharts: {
      type: Number,
      default: 0
    },
    chart: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chart',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: false }
)

export const File = model('File', FileSchema)
