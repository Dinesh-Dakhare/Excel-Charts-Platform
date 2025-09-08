import React from 'react'
import {
  FaChartBar,
  FaDownload,


  FaCalendarAlt,
  FaFileExcel,
  
} from 'react-icons/fa'
import { calculateStorageUsed } from '../lib/calculateStorageUsed'
const DashboardCard = ({user}) => {
 
  
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 mt-10'>
        <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
          <div className=' flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Total User</p>
              <p className='text-xl sm:text-2xl font-bold text-gray-900'>
               {user?.totalUsers}
              </p>
            </div>
            <FaChartBar className='w-8 h-8 text-blue-600' />
          </div>
        </div>

        <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Total charts</p>
              <p className='text-xl sm:text-2xl font-bold text-gray-900'>
               {user?.chartsTotal}
              </p>
            </div>
            <FaDownload className='w-8 h-8 text-green-600' />
          </div>
        </div>

        <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500 mb-1'>Total downloads</p>
              <p className='text-xl sm:text-2xl font-bold text-gray-900'>
                {user?.totalDownloads}
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
              {calculateStorageUsed(user?.chart)}
              </p>
            </div>
            <FaFileExcel className='w-8 h-8 text-orange-600' />
          </div>
        </div>
      </div>
  )
}

export default DashboardCard