import React from 'react'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useUpload } from '../context/UploadContext.jsx'
import convertFileSize from '../lib/convertFileSize.js'

const UploadDoc = () => {
  const navigation = useNavigate()
  const [fileUploaded, setFileUploaded] = useState(false)
  const {
    setLabels,
    setDataSet,
    setXLabel,
    setYLabel,
    setHeaders,
    setExcelData,
    setFileSize,
setFileName,
  } = useUpload()
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
const filename = e.target.files[0].name
const fileSize = e.target.files[0].size
setFileName(filename)
    setFileSize(convertFileSize(fileSize))

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json(worksheet, {defval: ''})

    const columns = Object.keys(json[0])
    setHeaders(columns)
    setExcelData(json)

    

    const [header, ...rows] = json
    const x = rows.map((row) => row[0])
    const y = rows.map((row) => row[1])

    setLabels(x)
    setDataSet(y)
    setXLabel(header[0])
    setYLabel(header[1])
    setFileUploaded(true)

const timer = setTimeout(() => {
       navigation('/dashboard/report')
    }, 2000); // 3 seconds delay

    return () => clearTimeout(timer); // clean up if component unmounts
  }
  return (
    <div className='ml-65 relative h-screen '>
      <div className='flex items-center justify-center translate-y-1/2  '>
        {/* upload file */}
        <div className='w-[42rem] h-[20rem] shadow rounded-4xl flex flex-col items-center  pt-6 '>
          {fileUploaded ? (
            <div className='flex flex-col items-center justify-center h-full'>
              <span className='text-6xl'>
                <IoMdCheckmarkCircleOutline className='text-purple-500' />
              </span>
              <h1>
                File uploaded{' '}
                <span className='text-purple-500'>successfully!</span>
              </h1>
            </div>
          ) : (
            <div className='space-y-10  flex flex-col items-center '>
              <label className='w-[38rem] h-[12rem] border-2 border-dashed border-purple-500 rounded-4xl cursor-pointer  '>
                <div className='translate-y-1/2 pt-3'>
                  <p className='font-bold text-2xl block text-center'>
                    Drag & Drop your{' '}
                    <span className='text-purple-500 cursor-pointer font-bold underline '>
                      file
                    </span>
                  </p>
                  <p className='text-center '>
                    or{' '}
                    <span className='text-purple-500 cursor-pointer font-bold underline '>
                      {' '}
                      browse{' '}
                    </span>
                    on your computer
                  </p>
                </div>
                <input
                  type='file'
                  className='w-full h-full hidden'
                  onChange={handleFileUpload}
                />
              </label>
              <div>
                <button className='bg-purple-500 text-white px-4 py-2 rounded-2xl '>
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    
      
    </div>
  )
}

export default UploadDoc
