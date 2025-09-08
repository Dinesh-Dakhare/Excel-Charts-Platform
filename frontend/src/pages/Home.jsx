
import React, { useState } from 'react'
import { useContext } from 'react'
import {
  FaUpload,
  FaChartBar,
  FaRegUser,
  FaFileExcel,
  FaStar,
  FaArrowRight,
  FaCloudDownloadAlt,
  FaShieldAlt,
  FaSignOutAlt,
} from 'react-icons/fa'
import { FaBarsStaggered } from 'react-icons/fa6'
import { GoZap } from 'react-icons/go'
import { IoMdTrendingUp } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import NavBar from '../components/NavBar'
import { div } from 'three/tsl'

export default function Home() {
  const token = localStorage.getItem('token')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user,logout,role } = useContext(AuthContext)
  const navigate = useNavigate()
    const handleSignout=async()=>{
    logout()
navigate('/login')
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-5'>
              {/* <div onClick={handleSidebarToggle}>
                <FaBarsStaggered className='size-5 text-gray-500 hover:text-gray-950 cursor-pointer' />
              </div> */}
              <FaChartBar className='h-8 w-8 text-teal-600' />
              <span className='text-xl font-bold text-gray-900'>ChartGen</span>
            </div>

            <div className='flex items-center gap-4'>
             

              <NavLink
                to={'/dashboard/upload'}
                className='bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors text-decoration-none'
              >
                Get Started
              </NavLink>
               {token ? (
                <div className='space-x-4 flex items-center'>
                 <NavLink
                to={role === 'admin' ? '/admin/dashboard' : '/dashboard/user'}
                className='flex items-center gap-3 px-2 py-1 text-gray-600 hover:text-gray-900 cursor-pointer '
              >
                {/* <img
                  src={user?.profileImageUrl}
                  alt='User'
                  className='size-10 rounded-full hover:opacity-50 transition-opacity '
                /> */}
                <div className='border-2 border-gray-300 rounded-full w-10 h-10'>
                  
                {user && user.profileImageUrl? ( 
                                                  <img
                                                    src={user.profileImageUrl}
                                                    alt='Profile'
                                                    className='size-10 rounded-full'
                                                  />
                                               ):
                                               
                                                <span className='flex items-center justify-center w-full h-full text-gray-400'><FaRegUser /></span>
                                               } 
                </div>
              </NavLink>
                          <div className='hover:scale-110 text-black cursor-pointer ' onClick={handleSignout}><FaSignOutAlt /></div>
                </div>
              ) : (
                <NavLink
                  to={'/login'}
                  className='!text-gray-600 hover:text-teal-600 transition-colors text-decoration-none '
                >
                  Sign In
                </NavLink>
              )}
             
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='bg-gradient-to-br from-white to-gray-50 pt-16 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            <div>
              <div className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 mb-6'>
                {/* <Zap className="h-4 w-4 mr-1" /> */}
                Transform Data Instantly
              </div>
              <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-6'>
                Turn Your <span className='text-teal-600'>Excel Data</span> Into
                <span className='text-orange-500'> Beautiful Charts</span>
              </h1>
              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                Upload your Excel files and instantly generate stunning,
                professional charts. Download as PNG or PDF with just one click.
                No design skills required.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <NavLink
                  to={'/dashboard/upload'}
                  className='text-decoration-none bg-teal-600 text-white px-8 py-4 rounded text-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg'
                >
                  Start Converting Now
                  <FaArrowRight className='inline ml-2 h-5 w-5' />
                </NavLink>
                <button className='hover:scale-105 transition-all duration-300 ease-in-out delay-50 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded text-lg font-semibold hover:border-teal-600 hover:text-teal-600 transition-colors'>
                  Watch Demo
                </button>
              </div>
            </div>
            <div className='relative'>
              <div className='bg-white rounded-2xl shadow-md hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg p-8'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Revenue Analytics
                  </h3>
                  <div className='flex space-x-2'>
                    <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                    <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                    <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Q1 2024</span>
                    <div className='w-32 bg-gray-200 rounded-full h-3'>
                      <div className='w-3/4 bg-teal-500 h-3 rounded-full'></div>
                    </div>
                    <span className='text-teal-600 font-semibold'>75%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Q2 2024</span>
                    <div className='w-32 bg-gray-200 rounded-full h-3'>
                      <div className='w-5/6 bg-orange-500 h-3 rounded-full'></div>
                    </div>
                    <span className='text-orange-500 font-semibold'>85%</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>Q3 2024</span>
                    <div className='w-32 bg-gray-200 rounded-full h-3'>
                      <div className='w-4/5 bg-teal-500 h-3 rounded-full'></div>
                    </div>
                    <span className='text-teal-600 font-semibold'>80%</span>
                  </div>
                </div>
                <div className='mt-6 pt-6 border-t border-gray-100'>
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-sm'>Total Revenue</span>
                    <span className='text-2xl font-bold text-gray-900'>
                      $86,924.02
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Everything You Need to Create{' '}
              <span className='text-teal-600'>Amazing Charts</span>
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Powerful features designed to make data visualization effortless
              and professional
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors'>
                <FaUpload className='h-6 w-6 text-teal-600 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Easy Upload
              </h3>
              <p className='text-gray-600'>
                Simply drag and drop your Excel files or browse to select them.
                Supports .xlsx, .xls, and .csv formats.
              </p>
            </div>

            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors'>
                <FaChartBar className='h-6 w-6 text-orange-500 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Multiple Chart Types
              </h3>
              <p className='text-gray-600'>
                Generate bar charts, line graphs, pie charts, scatter plots, and
                more. Choose the perfect visualization for your data.
              </p>
            </div>

            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors'>
                <FaCloudDownloadAlt className='h-6 w-6 text-teal-600 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Export Anywhere
              </h3>
              <p className='text-gray-600'>
                Download your charts as high-quality PNG images or PDF
                documents. Perfect for reports and presentations.
              </p>
            </div>

            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors'>
                <GoZap className='h-6 w-6 text-orange-500 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Lightning Fast
              </h3>
              <p className='text-gray-600'>
                Process thousands of rows in seconds. Our optimized engine
                ensures your charts are ready instantly.
              </p>
            </div>

            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors'>
                <FaShieldAlt className='h-6 w-6 text-teal-600 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Secure & Private
              </h3>
              <p className='text-gray-600'>
                Your data is processed securely and never stored on our servers.
                Complete privacy guaranteed.
              </p>
            </div>

            <div className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300'>
              <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors'>
                <IoMdTrendingUp className='h-6 w-6 text-orange-500 group-hover:text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Smart Analytics
              </h3>
              <p className='text-gray-600'>
                Automatic data analysis and chart recommendations based on your
                data patterns and structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              From Excel to Charts in{' '}
              <span className='text-orange-500'>3 Simple Steps</span>
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Transform your data into professional visualizations without any
              technical knowledge
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <FaFileExcel className='h-8 w-8 text-white' />
              </div>
              <div className='bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4'>
                Step 1
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Upload Your Excel File
              </h3>
              <p className='text-gray-600'>
                Drag and drop your Excel file or click to browse. We support all
                major formats including .xlsx, .xls, and .csv.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <FaChartBar className='h-8 w-8 text-white' />
              </div>
              <div className='bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4'>
                Step 2
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Choose Chart Type
              </h3>
              <p className='text-gray-600'>
                Select from our wide range of chart types or let our AI
                recommend the best visualization for your data.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <FaCloudDownloadAlt className='h-8 w-8 text-white' />
              </div>
              <div className='bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4'>
                Step 3
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Download & Share
              </h3>
              <p className='text-gray-600'>
                Export your beautiful charts as PNG images or PDF documents.
                Ready for presentations and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            <div>
              <div className='text-4xl font-bold text-teal-600 mb-2'>1M+</div>
              <div className='text-gray-600'>Charts Generated</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-orange-500 mb-2'>
                50K+
              </div>
              <div className='text-gray-600'>Happy Users</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-teal-600 mb-2'>99.9%</div>
              <div className='text-gray-600'>Uptime</div>
            </div>
            <div>
              <div className='text-4xl font-bold text-orange-500 mb-2'>
                24/7
              </div>
              <div className='text-gray-600'>Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-teal-600 to-orange-500'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            Ready to Transform Your Data?
          </h2>
          <p className='text-xl text-white/90 mb-8'>
            Join thousands of professionals who trust ChartGen for their data
            visualization needs
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <NavLink
              to={'/dashboard/upload'}
              className='text-decoration-none bg-white !text-teal-600 px-8 py-4 rounded text-lg font-semibold hover:bg-gray-100 shadow-lg hover:scale-105 transition-all duration-300 delay-50 ease-in-out'
            >
              Start Free Trial
            </NavLink>
            <button className=' border-2 border-white text-white px-8 py-4 rounded text-lg font-semibold hover:scale-105 hover:text-slate-600 transition-all duration-300 delay-50 ease-in-out '>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-8 mb-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <FaChartBar className='h-8 w-8 text-teal-400' />
                <span className='text-xl font-bold'>ChartGen</span>
              </div>
              <p className='text-gray-400 mb-4'>
                Transform your Excel data into beautiful charts with just a few
                clicks.
              </p>
              <div className='flex space-x-4'>
                <div className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer'>
                  <FaRegUser className='h-4 w-4' />
                </div>
                <div className='w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer'>
                  <FaStar className='h-4 w-4' />
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Product</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors  text-decoration-none'
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Company</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Support</h3>
              <ul className='space-y-2 text-gray-400'>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-white transition-colors text-decoration-none'
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © 2024 ChartGen. All rights reserved.
            </p>
            <p className='text-gray-400 text-sm'>
              Built with ❤️ for data enthusiasts
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
