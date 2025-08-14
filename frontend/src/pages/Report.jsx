import React, { useRef } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { IoBarChartSharp } from 'react-icons/io5'
import ChartRender from '../components/ChartRender.jsx'
import { useUpload } from '../context/UploadContext.jsx'
import { useState } from 'react'
import ExcelDataTable from '../components/ExcelDataTable.jsx'
import axios from 'axios'
import jsPDF from 'jspdf'
const Report = () => {
  const [xField, setXField] = useState('')
  const [yField, setYField] = useState('')
  const chartRef = useRef(null)
  const {
    chartType,
    setChartType,
    chartTitle,
    setChartTitle,
    headers,

    excelData,
    fileSize,
    fileName,
    setChartLabels,
    setChartData,
    chartData,
    chartLabels,
  } = useUpload()

  const generateChart = async () => {
    if (!xField || !yField || excelData.length === 0) return

    const labels = excelData.map((row) => row[xField])
    const values = excelData.map((row) => parseFloat(row[yField]))

    setChartLabels(labels)
    setChartData(values)

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/chart/upload',
        {
          labels,
          values,
          chartType,
          chartTitle,
          xField,
          yField,
          fileName,
          fileSize,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const downloadPNG = () => {
    const chart = chartRef.current
    const canvas = chart.canvas

    // Create a copy canvas
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const ctx = tempCanvas.getContext('2d')

    // Fill background
    ctx.fillStyle = '#ffffff' // white background (change as needed)
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

    // Draw the original chart on top
    ctx.drawImage(canvas, 0, 0)

    // Download PNG
    const link = document.createElement('a')
    link.href = tempCanvas.toDataURL('image/png', 1.0)
    link.download = `${fileName}.png`
    link.click()
  }

  const downloadPDF = () => {
  const chart = chartRef.current;
  const canvas = chart.canvas;

  // Create higher resolution canvas
  const scale = 3; // 3x resolution
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;
  const ctx = tempCanvas.getContext('2d');

  // Scale drawing for sharper image
  ctx.scale(scale, scale);

  // Fill background (white)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

  // Draw chart on high-res canvas
  ctx.drawImage(canvas, 0, 0);

  // Convert to high-quality image
  const imgData = tempCanvas.toDataURL('image/png', 1.0);

  // Create PDF
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Add image (scaled to fit PDF)
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Save
  pdf.save(`${fileName}.pdf`);
  }

  return (
    <div className='ml-65 p-4 mt-10 overflow-x-hidden '>
      {/* filename */}
      <div>
        <ul className='text-xl '>
          <li className='font-medium text-xl'>Sample_chart_Data.xlsx</li>
          <li className='text-sm font-normal'>5 rows, 5 columns</li>
        </ul>
      </div>
      {/* chart_configuration */}
      <div className='flex items-center justify-center mt-20'>
        <div className='shadow p-6 w-[60rem] space-y-5 rounded-lg'>
          <div className='flex items-center  gap-2 text-2xl font-medium'>
            <IoMdSettings />
            Chart Configuration
          </div>
          {/* chart type chart title */}
          <div className='flex w-full justify-center space-x-10'>
            <div className='flex w-full flex-col space-y-2'>
              <label htmlFor='' className='text-lg font-medium w-full'>
                Chart Type
              </label>
              <select
                onChange={(e) => setChartType(e.target.value)}
                value={chartType}
                className='p-1 rounded-md border-1 w-full z-10 '
              >
                <option value='bar'>Bar</option>
                <option value='line'>Line</option>
                <option value='pie'>Pie</option>
                <option value='doughnut'>Doughnut</option>
                <option value='polarArea'>PolarArea</option>
                <option value='bubble'>Bubble</option>
                <option value='radar'>Radar</option>
              </select>
            </div>
            <div className='flex w-full flex-col space-y-2'>
              <label htmlFor='' className='text-lg font-medium'>
                Chart Title
              </label>
              <input
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                type='text'
                className='py-1 px-2 rounded-md border-1 w-full'
                placeholder='Chart Title'
              />
            </div>
          </div>
          <div className='flex w-full justify-center space-x-10'>
            <div className='flex w-full flex-col space-y-2'>
              <label htmlFor='' className='text-lg font-medium'>
                X-Axis
              </label>
              <select
                value={xField}
                type='text'
                className='p-1 rounded-md border-1 w-full'
                onChange={(e) => setXField(e.target.value)}
              >
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex w-full flex-col space-y-2'>
              <label htmlFor='' className='text-lg font-medium'>
                Y-Axis
              </label>
              <select
                value={yField}
                type='text'
                className='p-1 rounded-md border-1 w-full'
                onChange={(e) => setYField(e.target.value)}
              >
                {headers.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex justify-between gap-2 mt-4'>
            <div>
              <button
                onClick={generateChart}
                className='px-4 py-2 bg-blue-500 text-white rounded font-medium flex items-center gap-2'
              >
                <IoBarChartSharp />
                Generate Chart
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={downloadPNG}
                className='px-4 py-2 bg-blue-500 text-white rounded'
              >
                Download PNG
              </button>
              <button
                onClick={downloadPDF}
                className='px-4 py-2 bg-green-500 text-white rounded'
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mt-20 w-full'>
        <ExcelDataTable data={excelData} />
      </div>
      {/* chart render  */}
      <div className='flex items-center justify-center mt-20 '>
        <ChartRender
          ref={chartRef}
          chartTitle={chartTitle}
          chartType={chartType}
          chartLabels={chartLabels}
          chartData={chartData}
          yField={yField}
          xField={xField}
        />
      </div>
    </div>
  )
}

export default Report
