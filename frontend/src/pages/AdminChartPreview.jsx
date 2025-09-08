import axios from 'axios';

import React, { useState } from 'react'
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { IoMdArrowDropleft } from "react-icons/io";
import convertFileSize from '../lib/convertFileSize';
import { formatDate } from '../lib/date';
import { generateChartsIcons } from '../lib/generateChartsIcons';
                                                    
const AdminChartPreview = () => {
    const [userData,setUserData] = useState(null);
    const [userCharts,setUserCharts] = useState(null);
      const [page, setPage] = useState(1)
      const [limit] = useState(5)
const { id } = useParams();
    const getUserCharts = async()=>{

        try {
            const res = await axios.get(`http://localhost:5000/api/v1/admin/user-charts/${id}`,{params:{page,limit},
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
if(res.status === 200){
   
    setUserData(res.data)
    setUserCharts(res.data.charts)
}
        } catch (error) {
            console.log(error);
            
        }
    }
    
    useEffect(()=>{
      getUserCharts();
      
    }, [page,limit]);
    const totalPages = Math.ceil(userData?.totalCharts / limit)
    return (
    <div className='lg:ml-65 min-h-screen overflow-x-hidden p-2'>
            <NavLink to={'/admin/dashboard'} className='ms-10'>
        <span className='text-2xl font-bold rounded-full cursor-pointer size-8 border  flex justify-center items-center my-10'><IoMdArrowDropleft className='size-7' /></span>
      </NavLink>
      <div className='flex justify-between p-2'>
        <div>
        <p className='text-2xl font-medium m-0 p-0'>username</p>
        <p className='text-lg font-medium opacity-50 m-0 p-0'>email@gmail.com</p>
        </div>
        <div>
            <p>date</p>
        </div>
      </div>
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
                              Type
                            </th>
                            <th className='text-left p-4 font-semibold text-gray-900'>
                              <button className='flex items-center gap-2 hover:text-blue-600 transition-colors'>
                                Created
                              </button>
                            </th>
                            <th className='text-left p-4 font-semibold text-gray-900'>
                              <button className='flex items-center gap-2 hover:text-blue-600 transition-colors'>
                                Size
                              </button>
                            </th>
      
                          
                          </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                          {
                            userCharts?.length === 0 && (
                              <tr>
                                <td colSpan={5} className='p-4 text-center'>
                                  No charts found
                                </td>
                              </tr>
                            )
                          }
                          {userCharts?.map((chart) => (
                            <tr
                              key={chart?._id}
                              className='hover:bg-gray-50 transition-colors'
                            >
                              <td className='p-4'>
                                <div className='flex items-center gap-3'>
                                  <div
                                    className={`max-md:hidden size-10 rounded-lg flex items-center justify-center text-white`}
                                  >
                                    {generateChartsIcons(chart?.chartType)}
                                  </div>
                                  <div>
                                    <div className='font-medium text-gray-900'>
                                      {chart?.filename}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                      {chart?.originalname}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='p-4'>
                                <span className='capitalize text-gray-600'>
                                  {chart?.chartType}
                                </span>
                              </td>
                              <td className=' p-4 text-gray-600'>
                                {formatDate(chart?.uploadedAt)}
                              </td>
                              <td className='p-4 text-gray-600'>
                                {convertFileSize(chart?.size)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
              {/* Pagination */}

            <div className='flex flex-col sm:flex-row items-center justify-between mt-6 gap-4'>
              <div className='text-sm text-gray-600'>
                Showing {userCharts?.length} of {userData?.totalCharts} charts
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
  )
}

export default AdminChartPreview