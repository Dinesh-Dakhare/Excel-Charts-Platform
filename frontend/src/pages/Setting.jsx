import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  FiUser,
  FiLock,
  FiCamera,
  FiSave,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiX,
} from 'react-icons/fi'
import { FaRegUser } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import {Loader} from '../components/Loader.jsx'
export const Setting = () => {
  const { user,setUser} = useContext(AuthContext)


  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
const[loading,setLoading]=useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const fileInputRef = useRef(null)

  const [profileData, setProfileData] = useState({
    firstName: '',
    email: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  })

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('profileImage', file)

    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
setUser({...user,profileImageUrl:res.data.profileImageUrl})
        alert('Profile image updated successfully!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await axios.put(
        'http://localhost:5000/api/v1/auth/password-change',

        passwordData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
       
        setPasswordData({
          currentPassword: '',
          newPassword: '',
        })
        setTimeout(() => {
          setIsSaving(false)
          setSuccessMessage(res.data.message)
          setTimeout(() => setSuccessMessage(''), 3000)
        }, 1000)
      }
    } catch (error) {
      setIsSaving(false)
      console.log(error)
    }
    // Simulate API call
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage('Password updated successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setSuccessMessage(''), 3000)
    }, 1000)
  }

  const handleInputChange = (field, value, type = 'profile') => {
    if (type === 'profile') {
      setProfileData((prev) => ({ ...prev, [field]: value }))
    } else {
      setPasswordData((prev) => ({ ...prev, [field]: value }))
    }
  }
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.username,
        email: user.email, // assuming user object has an email
      })
      setLoading(false)
    }
  }, [user])

  return (
    <div className='min-h-screen lg:ml-64 flex items-center justify-center '>
      {
        loading?(
          <Loader/>
        ):(
user &&(

      <div className=' mx-auto p-6  w-full '>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-4'></div>

          {successMessage && (
            <div className='flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200'>
              <FiCheck className='w-4 h-4' />
              <span className='text-sm font-medium'>{successMessage}</span>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/* Sidebar Navigation */}

          {/* Main Content */}
          <div className='lg:col-span-3'>
            <div className=' rounded shadow border  p-8'>
              {/* Profile Tab */}

              <div>
                <div className='space-y-6'>
                  {/* Profile Image Upload */}
                  <div className='flex items-center space-x-6'>
                    <div className='relative'>
                      <div className='w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg'>
                      {user && user.profileImageUrl && ( 
                        <img
                          src={user.profileImageUrl}
                          alt='Profile'
                          className='w-full h-full object-cover'
                        />
                     )} 
                      <span className='flex items-center justify-center w-full h-full text-gray-400'><FaRegUser /></span>
                      </div>

                      <button
                        type='button'
                        onClick={triggerFileInput}
                        className='absolute -bottom-1 -right-1 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors shadow-lg'
                      >
                        <FiCamera className='w-4 h-4' />
                      </button>
                      <form action='/upload' autoComplete='off' encType='multipart/form-data'>
                        <input
                          
                          ref={fileInputRef}
                          type='file'
                          accept='image/*'
                          onChange={handleImageUpload}
                          className='hidden'
                        />
                      </form>
                    </div>

                    <div>
                      <h3 className='font-medium text-gray-900'>
                        Profile Photo
                      </h3>
                      <p className='text-sm text-gray-500 mt-1'>
                        Click the camera icon to upload a new photo
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        User Name
                      </label>
                      <input
                        disabled
                        type='text'
                        value={profileData?.firstName}
                        onChange={(e) =>
                          handleInputChange('firstName', e.target.value)
                        }
                        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      <FiMail className='inline w-4 h-4 mr-2' />
                      Email Address
                    </label>
                    <input
                      type='email'
                      disabled
                      value={profileData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                    />
                  </div>

                  <div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Current Password
                      </label>
                      <div className='relative'>
                        <input
                          placeholder='Current Password'
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            handleInputChange(
                              'currentPassword',
                              e.target.value,
                              'password'
                            )
                          }
                          className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                          required
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showCurrentPassword ? (
                            <FiEyeOff className='w-5 h-5' />
                          ) : (
                            <FiEye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        New Password
                      </label>
                      <div className='relative'>
                        <input
                          placeholder='New Password'
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            handleInputChange(
                              'newPassword',
                              e.target.value,
                              'password'
                            )
                          }
                          className='w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                          required
                        />
                        <button
                          type='button'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                          {showNewPassword ? (
                            <FiEyeOff className='w-5 h-5' />
                          ) : (
                            <FiEye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                      <p className='text-xs text-gray-500 mt-1'>
                        Password must be at least 8 characters long
                      </p>
                    </div>
                  </div>

                  <div className='flex justify-end pt-4'>
                    <button
                      onClick={handleProfileSubmit}
                      disabled={isSaving}
                      className='flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                      <FiSave className='w-4 h-4' />
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Tab */}
            </div>
          </div>
        </div>
      </div>
)
        )
      }
    </div>
  )
}
