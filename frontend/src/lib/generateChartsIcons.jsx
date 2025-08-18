 
 import {
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaChartArea,
    FaDotCircle,
    FaCircleNotch,
    FaCompass,
    FaCloud,
  } from 'react-icons/fa'
 export const generateChartsIcons = (type) => {
    

    switch (type) {
      case 'bar':
        return <FaChartBar className='bg-blue-500 p-2 size-full rounded-md' />
      case 'line':
        return <FaChartLine className='bg-green-500 p-2 size-full rounded-md' />
      case 'pie':
        return <FaChartPie className='bg-purple-500 p-2 size-full rounded-md' />
      case 'area':
        return (
          <FaChartArea className='bg-orange-500 p-2 size-full rounded-md' />
        )
      case 'doughnut':
        return <FaDotCircle className='bg-red-500 p-2 size-full rounded-md' />
      case 'polarArea':
        return (
          <FaCircleNotch className='bg-yellow-500 p-2 size-full rounded-md' />
        )
      case 'radar':
        return <FaCompass className='bg-pink-500 p-2 size-full rounded-md' />
      case 'bubble':
        return <FaCloud className='bg-indigo-500 p-2 size-full rounded-md' />
      default:
        return <span></span>
    }
  }