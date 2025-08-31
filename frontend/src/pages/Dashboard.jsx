import React from 'react'

import { getDayMonthYear } from '../lib/date.js'
import {Loader} from '../components/Loader.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { calculateStorageUsed } from '../lib/calculateStorageUsed.js'
import {
  FaChartBar,
  FaDownload,
  FaEye,

  FaCalendarAlt,
  FaFileExcel,
  FaCloudUploadAlt,
} from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { getChartsCreatedThisMonth } from '../lib/getChartsCreatedThisMonth .js'
import { generateChartsIcons } from '../lib/generateChartsIcons.jsx'
import { NavLink } from 'react-router-dom'

import { div } from 'three/tsl'
const Dashboard = () => {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const todayDate = getDayMonthYear()

  const getFiledata = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/chart/chart-data',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
        setChartData(res.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFiledata()
  }, [])

  return (
    <div>

      {
    loading?(
    <div className='lg:ml-65 flex justify-center items-center h-screen'>
      <Loader/>
    </div>
    ):(
      chartData && (
        
        <div className='lg:ml-65 overflow-x-hidden px-4 h-screen'>
          {/* user custome name */}
          <ul className='mt-4 px-4'>
            <li className='text-lg font-bold uppercase'>hey, !Dinesh</li>
            <li className='text-sm font-semibold text-gray-500'>
              {todayDate.dayOfWeek},{todayDate.day} {todayDate.month}{' '}
              {todayDate.year}
            </li>
          </ul>
          {/* Cards */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 mt-10'>
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
              <div className=' flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Total Charts</p>
                  <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                    {chartData?.total}
                  </p>
                </div>
                <FaChartBar className='w-8 h-8 text-blue-600' />
              </div>
            </div>
      
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Total Downloads</p>
                  <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                    {chartData?.user?.downloads}
                  </p>
                </div>
                <FaDownload className='w-8 h-8 text-green-600' />
              </div>
            </div>
      
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>This Month</p>
                  <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                    {getChartsCreatedThisMonth(chartData)}
                  </p>
                </div>
                <FaCalendarAlt className='w-8 h-8 text-purple-600' />
              </div>
            </div>
      
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 mb-1'>Storage Used</p>
                  <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                    {calculateStorageUsed(chartData?.user?.charts)}
                  </p>
                </div>
                <FaFileExcel className='w-8 h-8 text-orange-600' />
              </div>
            </div>
          </div>
      
          {/* //chart render */}
          <div className='w-full my-20 '>
            <p className='text-lg font-medium'>Recent Chart</p>
            <div className='flex items-center gap-3 justify-between bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 px-10 py-6'>
              <div className='rounded-lg flex items-center justify-center text-white gap-3'>
                <div className='size-10 '>
                  {generateChartsIcons(chartData?.user?.charts[0]?.chartType)}
                </div>
                <div>
                  <div className='font-medium text-gray-900 text-xl'>
                    {chartData?.user?.charts[0]?.filename}
                  </div>
                  <div className='text-sm text-gray-500 '>
                    {chartData?.user?.charts[0]?.originalname}
                  </div>
                </div>
              </div>
              <NavLink
                to={`/dashboard/chart/${chartData?.user?.charts[0]?._id}`}
                className=' p-2 !text-gray-400 hover:text-blue-600 transition-colors'
              >
                <FaEye className='w-4 h-4' />
              </NavLink>
            </div>
          </div>
          {/* featuree */}
          <div className='w-full '>
            <p className='text-lg font-medium'>Quick Action</p>
            <div className='flex justify-start items-center py-6 space-x-10 flex-wrap  max-md:space-y-4'>
              <div className='bg-white/70 group hover:text-black font-medium text-gray-400 text-md lg:text-lg backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6 flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-all ease-in-out duration-150'>
                <FaCloudUploadAlt className='size-8 md:size-10 lg:size-12 text-gray-400 mx-auto group-hover:text-blue-600 ' />
                upload file
              </div>
              <div className='bg-white/70 cursor-pointer  group hover:text-black font-medium text-gray-400 text-md lg:text-lg backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6 flex items-center justify-center gap-3  hover:scale-105 transition-all ease-in-out duration-150'>
                <RiLockPasswordFill className='size-8 md:size-10 lg:size-12 text-gray-400 mx-auto group-hover:text-black' />
                change password
              </div>
              <div className='bg-white/70 cursor-pointer  group hover:text-black font-medium text-gray-400 text-md lg:text-lg backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6 flex items-center justify-center gap-3  hover:scale-105 transition-all ease-in-out duration-150'>
                <FaFileExcel className='size-8 md:size-10 lg:size-12 text-gray-400 mx-auto group-hover:text-green-600' />
                Excel to Summary
              </div>
            </div>
          </div>
        </div>
      )
    )
      }
    </div>
  )
}

export default Dashboard
