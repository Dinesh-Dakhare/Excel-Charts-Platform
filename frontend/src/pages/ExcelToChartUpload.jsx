import React, { useState, useRef, useCallback } from 'react'
import {
  FaChartBar,
  FaUpload,
  FaFileExcel,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaCloudUploadAlt,
  FaSpinner,
  FaBars,
  FaArrowRight,
  FaChartLine,
  FaChartPie,
  FaChartArea,
  FaDotCircle,
  FaDownload,
  FaEye,
  FaInfoCircle,
} from 'react-icons/fa'
import * as XLSX from 'xlsx'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useUpload } from '../context/UploadContext.jsx'
import convertFileSize from '../lib/convertFileSize.js'

export default function ExcelToChartUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(false)
  const navigation = useNavigate()

  const {
    setLabels,
    setDataSet,
    setXLabel,
    setYLabel,
    setHeaders,
    setExcelData,
    setFileSize,
    setFileName,
    fileName,
    fileSize,
  } = useUpload()

  const fileInputRef = useRef(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = async (fileList) => {
    const selectedFile = fileList[0] // Only take the first file

    const isValidType =
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      selectedFile.type === 'application/vnd.ms-excel' ||
      selectedFile.name.endsWith('.xlsx') ||
      selectedFile.name.endsWith('.xls')
    const isValidSize = selectedFile.size <= 10 * 1024 * 1024 // 10MB limit

    if (!isValidType) {
      alert('Please upload a valid Excel file (.xlsx or .xls)')
      return
    }

    if (!isValidSize) {
      alert('File size must be less than 10MB')
      return
    }
    setFileName(selectedFile.name)
    setFileSize(selectedFile.size)

    const data = await selectedFile.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

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

    setFile(true)

  }

  const removeFile = () => {
    setFile(null)
  }



  const handleUpload = async () => {
    if (!file) return
      navigation('/dashboard/report')
    
  }



  return (
    <div className='min-h-screen bg-white/30 backdrop-blur-lg lg:ml-64  mt-10 flex flex-col items-center'>
      <div className='space-y-6 lg:size-[55rem] p-4'>
        <div className='text-center'>
          <h3 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
            Upload Excel File
          </h3>
          <p className='text-gray-600'>
            Upload your Excel file to convert it into a beautiful chart
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type='file'
            accept='.xlsx,.xls'
            onChange={(e) => handleFiles(Array.from(e.target.files))}
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          />

          <FaCloudUploadAlt className='size-16 text-gray-400 mx-auto mb-4' />
          <p className='text-md lg:text-2xl font-medium text-gray-900 mb-2'>
            {dragActive
              ? 'Drop your Excel file here'
              : 'Drag & drop your Excel file here'}
          </p>
          <p className='text-gray-600 mb-4'>or</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className='bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
          >
            <FaUpload className='w-4 h-4' />
            Browse File
          </button>
          <p className='text-sm text-gray-500 mt-4'>
            Supported formats: .xlsx, .xls (Max 10MB)
          </p>
        </div>

        {/* File Preview */}
        {file && (
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Selected File
            </h3>
            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <FaFileExcel className='w-8 h-8 text-green-600' />
              <div className='flex-1 min-w-0'>
                <div className='font-medium text-gray-900 truncate'>
                  {fileName}
                </div>
                <div className='text-sm text-gray-500'>{convertFileSize(fileSize)}</div>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleUpload()}
                  className='p-2 text-gray-400 hover:text-green-600 transition-colors'
                >
                  <FaCheck className='w-5 h-5 ' />
                </button>
                <button
                  onClick={() => removeFile()}
                  className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                >
                  <FaTimes className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
     
    </div>
  )
}
