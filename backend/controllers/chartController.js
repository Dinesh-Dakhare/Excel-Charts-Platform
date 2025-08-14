import { Charts } from '../models/chartSchema.js'
import { File } from '../models/fileSchema.js'
import { User } from '../models/userSchema.js'
import charts from '../routes/chartRoutes.js'

export const chartUpload = async (req, res) => {
  try {
    const {
      labels,
      values,
      chartType,
      chartTitle,
      xField,
      yField,
      fileName,
      fileSize,
    } = req.body

    const { id: userId } = req.user
    console.log('user id', req.user)

    if (
      !labels ||
      !values ||
      !chartType ||
      !chartTitle ||
      !xField ||
      !yField ||
      !fileName ||
      !fileSize
    )
      return res.status(400).json({ message: 'All fields are required' })

    const chartData = {
      filename: chartTitle,
      originalname: fileName,
      size: fileSize,
      user: userId,
      chartType: chartType,
      headers: [xField, yField],
      rows: [labels, values],
      options: {},
    }
    const savedchart = await new Charts(chartData).save()

    // let file = await File.findOne({ filename: chartTitle, user: userId })

    // if (!file) {
    //   file = await File.create({
    //     filename: chartTitle,
    //     originalname: fileName,
    //     size: fileSize,
    //     user: userId,
    //     chart: savedchart._id,
    //     totalCharts: 1,
    //   })
    // } else {
    //   file.chart.push(savedchart._id)
    //   file.totalCharts += 1
    // }
    // const savedFile = await file.save()

    await User.findByIdAndUpdate(userId, {
      $addToSet: { charts: savedchart._id },
      $inc: {
        totalCharts: 1,
      },
    })
    res.json({
      message: 'Chart uploaded successfully',
    })
  } catch (error) {
    console.error('Upload Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const getHistory = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    let { page = 1, limit = 5, search = '', chartType = '' } = req.query
    console.log(search)

    const filter = {}
    if (search) {
      filter.filename = { $regex: search, $options: 'i' }
    }
    if (chartType) {
      filter.chartType = chartType
    }

    const skip = (page - 1) * limit
    const user = await User.findById(userId).populate({
      path: 'charts',
      match: filter,
      options: {
        sort: { createdAt: -1 },
        skip,
        limit: parseInt(limit),
      },
    })

    const totalCharts = await Charts.countDocuments({
      user: userId,
      ...filter,
    })

    res.status(200).json({
      user,
      page,
      limit,
      total: totalCharts || 0,
    })
  } catch (error) {
    console.error('Upload Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

export const chartCreated = async (req, res) => {
  console.log('hellow')

  const { id: userId } = req.user

  const user = await User.findById(userId).populate('charts')
  console.log(user)

  res.status(200).json({
    user,
  })
}

export const getAllData = async (req, res) => {
  try {
    const { id: userId } = req.user
    const user = await User.findById(userId).populate({
      path: 'charts',
      options: {
        sort: { createdAt: -1 },
      },
    })
    const totalCharts = await Charts.countDocuments({ user: userId })
    res.status(200).json({
      user,
      total: totalCharts || 0,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteChart = async (req, res) => {
  try {
    const deleted = await Charts.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Chart not found' })

    res.json({ message: 'Chart deleted successfully' })
  } catch (error) {
     res.status(500).json({ message: "Server error" });
  }
}
