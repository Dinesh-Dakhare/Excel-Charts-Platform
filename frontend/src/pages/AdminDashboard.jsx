import axios from "axios";
import DashboardCard from "../components/DashboardCard";
import { useEffect, useState } from "react";
import { formatDate, getDayMonthYear } from '../lib/date.js'
import UserTable from "../components/UserTable.jsx";
import { NavLink } from "react-router-dom";
import { generateChartsIcons } from "../lib/generateChartsIcons.jsx";
import convertFileSize from "../lib/convertFileSize.js";
import { calculateStorageUsed } from "../lib/calculateStorageUsed.js";

const AdminDashboard = () => {
    const [user,setUser]=useState()
    const [chartData,setChartData]=useState({})
    const [page,setPage]=useState(1)
    const [limit] = useState(5)
      const todayDate = getDayMonthYear()
    
  const getUserData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/v1/admin/userData?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(res.status === 200){
      console.log(res.data)
      setUser(res.data)
    }
  };

  const getLatestChart = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/v1/admin/chart-latest",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(res.status === 200){
      setChartData(res.data)
    }
  }
  useEffect(() => {
    getLatestChart()
    getUserData();
  },[page])

  const totalPages = Math.ceil(user?.totalUsers / limit)
 
  const handleDeleteFile = (id)=>{
try {
  const res = axios.delete(
    `http://localhost:5000/api/v1/admin/user/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
  if(res.status === 200){
    console.log('user is deleted')
    getUserData()
  }
} catch (error) {
  console.log(error);
  
}
  }
  

  return (
    <div className="lg:ml-65 min-h-screen mt-10">
         <ul className='mt-4 px-4'>
        <li className='text-lg font-bold uppercase'>hey, !Admin</li>
        <li className='text-sm font-semibold text-gray-500'>
          {todayDate.dayOfWeek},{todayDate.day} {todayDate.month}{' '}
          {todayDate.year}
        </li>
      </ul>
      <DashboardCard user={user}/>
 <div className=' lg:block overflow-x-auto'>
      <p className="text-2xl font-bold text-gray-900 mt-10">
        Recents
      </p>

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
                  
                      <tr
                        key={chartData?._id}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                            <div
                              className={`max-md:hidden size-10 rounded-lg flex items-center justify-center text-white`}
                            >
                              {generateChartsIcons(chartData?.chartType)}
                            </div>
                            <div>
                              <div className='font-medium text-gray-900'>
                                {chartData?.filename}
                              </div>
                              <div className='text-sm text-gray-500'>
                                {chartData?.originalname}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='p-4'>
                          <span className='capitalize text-gray-600'>
                            {chartData?.chartType}
                          </span>
                        </td>
                        <td className=' p-4 text-gray-600'>
                          {formatDate(chartData?.uploadedAt)}
                        </td>
                        <td className='p-4 text-gray-600'>
                          {convertFileSize(chartData?.size)}
                        </td>
                      </tr>
                 
                  </tbody>
                </table>

              </div>
      <p className="text-2xl font-bold text-gray-900 mt-10">Users</p>
      <UserTable user={user?.users} handleDeleteFile={handleDeleteFile}/>
      
                {/* pagenation */}
                   <div className='flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 px-4 my-10'>
              <div className='text-sm text-gray-600'>
                Showing {user?.users?.length} of {user?.totalUsers} charts
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
  );
};

export default AdminDashboard;
