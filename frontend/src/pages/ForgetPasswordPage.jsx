import React, { use, useState } from 'react'
  import { ToastContainer, toast } from 'react-toastify';

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUpload,
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlinePieChart,

} from 'react-icons/ai'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const ForgetPasswordPage = ({mode}) => {
  const {token} = useParams()
    const [forgetPassword, setForgetPassword] = useState(mode === 'forget-password')
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    })
const navigate = useNavigate()
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      {
        if(mode === 'forget-password'){
          try {
            const res = await axios.post(
              'http://localhost:5000/api/v1/auth/forget-password',{email:formData.email})
      
              if (res.status === 200) {
           
                toast.success(res.data.message)
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                })
              }
            } catch (error) {
            toast.warning(error.response.data.message)
            console.log(error);
            
          }
        }else if(mode === 'reset-password'){
          try {
            const res = await axios.post(
              'http://localhost:5000/api/v1/auth/reset-password',{password:formData.password,confirmPassword:formData.confirmPassword,passwordResetToken:token})
      
              if (res.status === 200) {
                toast.success(res.data.message)
                navigate('/login')
              }
            } catch (error) {
            toast.warning(error.response.data.message)
            console.log(error);
            
          }
        }
      }
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
                {forgetPassword ? 'Forget Password' : 'Reset Password'}
              </h2>
           
            </div>

            <form className='space-y-6'>
         
{
  forgetPassword && (
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
  )
}
            
              
              {
                !forgetPassword && (
                  <>
                  
                  <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    // type={showPassword ? 'text' : 'password'}
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
                    // onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  >
                    {/* {showPassword ? (
                      <AiOutlineEyeInvisible className='w-5 h-5' />
                    ) : (
                      <AiOutlineEye className='w-5 h-5' />
                    )} */}
                  </button>
                </div>
              </div>
                  
        <div>
                <label
                  htmlFor='confirm password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Confirm password
                </label>
                <div className='relative'>
                  <input
                    // type={showPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12'
                    placeholder='Enter your password'
                    required
                  />
                  <button
                    type='button'
                    // onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  >
                    {/* {showPassword ? (
                      <AiOutlineEyeInvisible className='w-5 h-5' />
                    ) : (
                      <AiOutlineEye className='w-5 h-5' />
                    )} */}
                  </button>
                </div>
              </div>
                  </>

                )
              }
     

              <button
                type='button'
                onClick={handleSubmit}
                className='w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:scale-[1.02] transition-all duration-200'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ForgetPasswordPage