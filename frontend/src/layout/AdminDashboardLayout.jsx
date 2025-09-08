import React from 'react'
import NavBar from '../components/NavBar.jsx'
import { FaBarsStaggered } from 'react-icons/fa6'
import { useState } from 'react'

import { Outlet } from 'react-router-dom'

const AdminDashboardLayout = () => {
  const [openNav, setOpenNav] = useState(true)

  return (
    <div className='w-screen h-screen '>
      <div
        className={`lg:hidden p-4 ${
          openNav ? 'hidden' : 'block'
        } ease-in-out duration-300} cursor-pointer`}
        onClick={() => setOpenNav(!openNav)}
      >
        <FaBarsStaggered />
      </div>
      <NavBar openNav={openNav} setOpenNav={setOpenNav} />
      <main className='overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 p-2 '>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminDashboardLayout
