import React, { use, useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ChartRender from '../components/ChartRender.jsx'
import axios from 'axios'
import { IoMdArrowDropleft } from "react-icons/io";
import jsPDF from 'jspdf'

const ChartPreview = () => {
    const {id} = useParams()
const [files,setFiles]=useState()
  const chartRef = useRef(null)

    const getSingleChartRender = async()=>{
try {
  const res = await axios.get(`http://localhost:5000/api/v1/chart/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  if(res.status === 200){
   
    
setFiles(res.data)
  }
} catch (error) {
 console.log();
  
}

    }
    useEffect(() => {
      getSingleChartRender()
    },[])

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
        link.download = `${files.filename}.png`
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
      pdf.save(`${files.filename}.pdf`);
      }
  return (
    <div className='lg:ml-64 min-h-screen mt-10 w-full'>
      <NavLink to={'/dashboard/history'} className='ms-10'>
        <span className='text-2xl font-bold rounded-full cursor-pointer size-8 border  flex justify-center items-center'><IoMdArrowDropleft className='size-7' /></span>
      </NavLink>
      <div className='flex flex-col justify-center items-center w-full'>


<div className=' flex justify-start max-w-[60rem] p-4 w-full '>
      <div >
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

{/* chartrender */}
    <div className='flex items-center justify-center w-full'>
{/* <ChartRender/> */}

{
  files?<ChartRender
          ref={chartRef}
          chartTitle={files?.filename}
          chartType={files?.chartType}
          chartLabels={files?.rows[0]}
          chartData={files?.rows[1]}
          yField={files?.headers[1]}
          xField={files?.headers[0]}
        />
        :
        <h1>no data</h1>
}
        
    </div>
</div>

    </div>
  )
}

export default ChartPreview