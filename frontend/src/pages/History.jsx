import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FaDownload, FaEye, FaTrash, FaSearch } from 'react-icons/fa'
import convertFileSize from '../lib/convertFileSize.js'
import { Loader } from '../components/Loader'
import { NavLink } from 'react-router-dom'
import { generateChartsIcons } from '../lib/generateChartsIcons.jsx'
import { formatDate } from '../lib/date.js'

const History = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)

  const [filterType, setFilterType] = useState('all')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  const handleGetHistory = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        'http://localhost:5000/api/v1/chart/history',
        {
          params: {
            page,
            limit,
            search: searchTerm,
            chartType: filterType !== 'all' ? filterType : '',
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
        setFiles(res.data.user)
        setTotal(res.data.total)
        setLoading(false)

      
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(total / limit)
 

  const handleDeleteFile = async (chartId) => {

    if (!window.confirm('Are you sure you want to delete this chart?')) return
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/chart/${chartId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.status == 200) {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    handleGetHistory()
   
  }, [page, limit, debouncedSearch, filterType])

  return (
    <div className='lg:ml-64 '>
      {!loading ? (
        <div className='min-h-screen '>
          {/* Main Content */}
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
            {/* Page Header */}
            <div className='mb-6 sm:mb-8'>
              <p className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
                Chart History
              </p>
              <p className='text-gray-700'>
                Manage and download your previously created{' '}
                <span className='text-teal-600 font-medium'>charts</span>
              </p>
            </div>

     

            {/* Filters and Search */}
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md  border-white/20 p-4 sm:p-6 mb-6'>
              <div className='flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between'>
                {/* Search */}
                <div className='relative flex-1 max-w-md'>
                  <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='text'
                    placeholder='Search charts...'
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <select
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value='all'>All Types</option>
                    <option value='bar'>Bar Charts</option>
                    <option value='line'>Line Charts</option>
                    <option value='pie'>Pie Charts</option>
                    <option value='area'>Area Charts</option>
                    <option value='scatter'>Scatter Plots</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Charts Table */}
            <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md  border-white/20  mb-6 overflow-hidden'>
              {/* Desktop Table */}
              <div className=' lg:block overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b'>
                    <tr>
                      <th className='text-left p-4 font-semibold text-gray-900'>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors'>
                          Chart Name
                        </button>
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-900'>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors max-md:hidden'>
                        Type
                        </button>
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-900 '>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors '>
                          Created
                        </button>
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-900 max-md:hidden'>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors '>
                          Size
                        </button>
                      </th>

                      <th className='text- p-4 font-semibold text-gray-900'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {files.charts?.map((chart) => (
                      <tr
                        key={chart._id}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                            <div
                              className={`max-md:hidden size-10 rounded-lg flex items-center justify-center text-white md:hidden`}
                            >
                              {generateChartsIcons(chart.chartType)}
                            </div>
                            <div>
                              <div className='font-medium text-gray-900'>
                                {chart.filename}
                              </div>
                              <div className='text-sm text-gray-500 line-clamp-1'>
                                {chart.originalname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='p-4'>
                          <span className='capitalize text-gray-600 max-md:hidden'>
                            {chart.chartType}
                          </span>
                        </td>
                        <td className=' p-4 text-gray-600'>
                          {formatDate(chart.uploadedAt)}
                        </td>
                        <td className='p-4 text-gray-600 max-md:hidden'>
                          {convertFileSize(chart.size)}
                        </td>

                        <td className='p-4'>
                          <div className='flex items-center gap-2'>
                            <NavLink
                              to={`/dashboard/chart/${chart._id}`}
                              className=' p-2 !text-gray-400 hover:text-blue-600 transition-colors'
                            >
                              <FaEye className='w-4 h-4' />
                            </NavLink>
                            <button
                              className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                              onClick={() => handleDeleteFile(chart._id)}
                            >
                              <FaTrash className='w-4 h-4' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}

            <div className='flex flex-col sm:flex-row items-center justify-between mt-6 gap-4'>
              <div className='text-sm text-gray-600'>
                Showing {files.charts?.length} of {total} charts
              </div>
              <div className='flex items-center gap-2'>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50'
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 border rounded-lg ${
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:opacity-50'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex items-center justify-center h-screen `}>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default History
