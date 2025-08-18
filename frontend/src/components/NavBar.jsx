import React, { useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { FaUpload } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
import { FaHistory, FaChartBar } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
        
import { AuthContext } from '../context/AuthContext'
import { FaRegUser } from "react-icons/fa";
const NavBar = ({ openNav, setOpenNav }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user,logout } = useContext(AuthContext)
  const handleSignout=async()=>{
    logout()
navigate('/login')
  }
  return (
    <div
      className={`z-50 fixed top-0 left-0 w-64 h-screen bg-white/70 backdrop-blur-sm p-4  ${
        openNav ? 'translate-x-0' : '-translate-x-full'
      } ease-in-out duration-300`}
    >
      {/* <!-- Top Section --> */}
      <div>
        {/* <!-- Logo & Profile --> */}
        <div className='flex items-center mb-6 gap-3 '>
          <div className='flex items-center space-x-5'>
            <NavLink
              to={'/'}
              className='text-decoration-none flex items-center space-x-3'
            >
              <FaChartBar className='h-8 w-8 text-teal-600' />
              <span className='text-xl font-bold text-gray-900'>ChartGen</span>
            </NavLink>
          </div>
          <span
            className='text-lg font-semibold md:hidden cursor-pointer'
            onClick={() => setOpenNav(!openNav)}
          >
            <ImCross className='text-sm' />
          </span>
        </div>

        {/* <!-- Nav List --> */}
        <ul className='m-0 p-0'>
          <li
            className={`flex items-center gap-2 px-2 py-2  rounded-md font-medium group ${
              location.pathname === '/dashboard/user'
                ? 'bg-white border drop-shadow'
                : ''
            }`}
          >
            <NavLink
              to={'/dashboard/user'}
              className={`flex items-center gap-2 text-decoration-none !text-slate-500   ${
                location.pathname === '/dashboard/user' ? '!text-green-600' : ''
              }`}
            >
              <AiFillHome
                className={` ${
                  location.pathname === '/dashboard/user'
                    ? 'text-green-500'
                    : ''
                }`}
              />
              Dashboard
            </NavLink>
          </li>
          <li
            className={`flex items-center gap-2 px-2 py-2 text-gray-500  rounded-md font-medium group ${
              location.pathname === '/dashboard/upload'
                ? 'bg-white border drop-shadow'
                : ''
            }`}
          >
            <NavLink
              className={`flex items-center gap-2 text-decoration-none !text-slate-500   ${
                location.pathname === '/dashboard/upload'
                  ? 'text-gray-600'
                  : 'text-gray-300'
              }`}
              to={'/dashboard/upload'}
            >
              <FaUpload
                className={` ${
                  location.pathname === '/dashboard/upload'
                    ? 'text-green-500'
                    : ''
                }`}
              />
              Upload File
            </NavLink>
          </li>
          <li
            className={`flex items-center gap-2 px-2 py-2  rounded-md font-medium group ${
              location.pathname === '/dashboard/history'
                ? 'bg-white border drop-shadow'
                : ''
            }`}
          >
            <NavLink
              to={'/dashboard/history'}
              className={`flex items-center gap-2 text-decoration-none !text-slate-500 hover:text-green-500 group  ${
                location.pathname === '/dashboard/history'
                  ? '!text-gray-600'
                  : ''
              }`}
            >
              <FaHistory
                className={` ${
                  location.pathname === '/dashboard/history'
                    ? 'text-green-500'
                    : ''
                }`}
              />
              History
            </NavLink>
          </li>
          <li
            className={`flex items-center gap-2 px-2 py-2  rounded-md font-medium group ${
              location.pathname === '/dashboard/settings'
                ? 'bg-white border drop-shadowb'
                : ''
            }`}
          >
            <NavLink
              to={'/dashboard/settings'}
              className={`flex items-center gap-2 text-decoration-none !text-slate-500 hover:!text-black  ${
                location.pathname === '/dashboard/settings'
                  ? '!text-gray-600'
                  : ''
              }`}
            >
              <IoSettings
                className={` ${
                  location.pathname === '/dashboard/settings'
                    ? 'text-green-500'
                    : ''
                }`}
              />
              Settings
            </NavLink>
          </li>
        </ul>
        <div className='space-y-2 text-sm fixed bottom-5'>
          <div className='flex items-center gap-3 px-2 py-1 text-gray-600 hover:text-gray-900 cursor-pointer '>
              {user && user.profileImageUrl? ( 
                                  <img
                                    src={user.profileImageUrl}
                                    alt='Profile'
                                    className='size-10 rounded-full'
                                  />
                               ):
                               
                                <span className='flex items-center justify-center w-full h-full text-gray-400'><FaRegUser /></span>
                               } 
            <div>
              <p className=' font-medium text-gray-900 text-lg p-0 m-0'>
                {user?.username}
              </p>
              <p className='text-sm text-gray-500 p-0 m-0'>{user?.email}</p>
            </div>
            <span className='hover:scale-110 ' onClick={handleSignout}><FaSignOutAlt /></span>
          </div>
        </div>
      </div>

      {/* Bottom Section  */}
    </div>
  )
}

export default NavBar
