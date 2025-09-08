import React from 'react'
import { NavLink } from 'react-router-dom'
import {  FaEye, FaTrash, } from 'react-icons/fa'
import { formatDate } from '../lib/date';
const UserTable = ({user,handleDeleteFile}) => {


  return (
    <div className='bg-white/70 backdrop-blur-sm rounded-xl shadow-md  border-white/20  mb-6 overflow-hidden'>
              {/* Desktop Table */}
              <div className=' lg:block overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50 border-b'>
                    <tr>
                      <th className='text-left p-4 font-semibold text-gray-900'>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors'>
                          User Name
                        </button>
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-900'>
                        Email Address
                      </th>
                      <th className='text-left p-4 font-semibold text-gray-900'>
                        <button className='flex items-center gap-2 hover:text-blue-600 transition-colors'>
                          CreatedAt
                        </button>
                      </th>
                    

                      <th className='text- p-4 font-semibold text-gray-900'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {user?.map((user) => (
                      <tr
                        key=''
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                           
                            <div>
                              <div className='font-medium text-gray-900'>
                                {user?.username}
                              </div>
                             
                            </div>
                          </div>
                        </td>
                        <td className='p-4'>
                          <span className='capitalize text-gray-600'>
                            {user?.email}
                          </span>
                        </td>
                        <td className=' p-4 text-gray-600'>
                         {formatDate(user?.createdAt)}
                        </td>
                        

                        <td className='p-4'>
                          <div className='flex items-center gap-2'>
                            <NavLink
                              to={`/admin/report/${user?._id}`}
                              className=' p-2 !text-gray-400 hover:text-blue-600 transition-colors'
                            >
                              <FaEye className='w-4 h-4' />
                            </NavLink>
                            <button
                              className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                              onClick={() => handleDeleteFile(user?._id)}
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
  )
}

export default UserTable