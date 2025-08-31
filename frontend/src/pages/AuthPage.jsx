import axios from 'axios'
import React, { useContext, useState } from 'react'
  import { ToastContainer, toast } from 'react-toastify';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUpload,
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlinePieChart,
  AiOutlineGoogle,
  AiFillFacebook,
} from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthPage = ({ mode }) => {
  const { login } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const location = useLocation()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLogin) {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/v1/auth/login',
          {
            email: formData.email,
            password: formData.password,
          }
        )
        if (res.status === 200) {
          console.log(res.data.message)
          toast.success(res.data.message)
          login(res.data.token, res.data.user)
          setTimeout(() => {
            navigate('/')
          },2000)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/v1/auth/register',
          {
            email: formData.email,
            password: formData.password,
            username: formData.fullName,
          }
        )
        if (res.status === 201) {
          console.log(res.data)
          toast.success(res.data.message)
          setIsLogin(true)
        }
      } catch (error) {
        toast.error(error)
        console.log(error)
      }
    }
    // Here you would typically handle authentication
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      fullName: '',
    })

    navigate(location.pathname === '/login' ? '/register' : '/login')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex'>
      {/* Left Side - Branding & Features */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-600 p-12 text-white relative overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-32 h-32 border border-white rounded-full'></div>
          <div className='absolute bottom-40 right-20 w-24 h-24 border border-white rounded-full'></div>
          <div className='absolute top-1/2 left-1/3 w-16 h-16 border border-white rounded-full'></div>
        </div>

        <div className='relative z-10 flex flex-col justify-between w-full'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>ChartGen</h1>
            <p className='text-xl text-teal-100 mb-12'>
              Transform Data Instantly
            </p>

            <div className='space-y-8'>
              <h2 className='text-3xl font-bold leading-tight'>
                Turn Your <span className='text-emerald-200'>Excel Data</span>{' '}
                Into
                <br />
                <span className='text-orange-300'>Beautiful Charts</span>
              </h2>

              <p className='text-lg text-teal-100 leading-relaxed'>
                Upload your Excel files and instantly generate stunning,
                professional charts. Download as PNG or PDF with just one click.
                No design skills required.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className='space-y-6'>
            <h3 className='text-xl font-semibold mb-4'>Why Choose ChartGen?</h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <AiOutlineUpload className='w-5 h-5 text-emerald-200' />
                <span className='text-teal-100'>
                  Instant Excel file processing
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <AiOutlineBarChart className='w-5 h-5 text-emerald-200' />
                <span className='text-teal-100'>
                  Multiple chart types available
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <AiOutlineLineChart className='w-5 h-5 text-emerald-200' />
                <span className='text-teal-100'>
                  Professional-grade visualizations
                </span>
              </div>
              <div className='flex items-center space-x-3'>
                <AiOutlinePieChart className='w-5 h-5 text-emerald-200' />
                <span className='text-teal-100'>
                  Export in PNG, PDF formats
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          {/* Mobile Logo */}
          <div className='lg:hidden text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800'>ChartGen</h1>
            <p className='text-teal-600 font-medium'>
              Transform Data Instantly
            </p>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
            <div className='text-center mb-8'>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className='text-gray-600'>
                {isLogin
                  ? 'Sign in to start creating amazing charts'
                  : 'Join thousands of users creating beautiful visualizations'}
              </p>
            </div>

            <form className='space-y-6'>
              {!isLogin && (
                <div>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors'
                    placeholder='Enter your full name'
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors'
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12'
                    placeholder='Enter your password'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className='w-5 h-5' />
                    ) : (
                      <AiOutlineEye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-2 block text-sm text-gray-700'
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href='#'
                    className='text-sm text-teal-600 hover:text-teal-500 font-medium'
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type='button'
                onClick={handleSubmit}
                className='w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:scale-[1.02] transition-all duration-200'
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className='mt-8 text-center'>
              <p className='text-gray-600'>
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <button
                  onClick={toggleAuthMode}
                  className='text-teal-600 hover:text-teal-500 font-medium hover:underline'
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className='mt-6 text-center'>
                <p className='text-xs text-gray-500'>
                  By creating an account, you agree to our{' '}
                  <a href='#' className='text-teal-600 hover:underline'>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href='#' className='text-teal-600 hover:underline'>
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Social Login Options */}
          {isLogin && (
            <div className='mt-6'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-gray-100 text-gray-500'>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-2 gap-3'>
                <button className='w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors'>
                  <AiOutlineGoogle className='w-5 h-5' />
                  <span className='ml-2'>Google</span>
                </button>

                <button className='w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors'>
                  <AiFillFacebook className='w-5 h-5' />
                  <span className='ml-2'>Facebook</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AuthPage
