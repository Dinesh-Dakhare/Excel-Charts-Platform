import React from 'react'
import { useParams } from 'react-router-dom'

const ChartPreview = () => {
    const {id} = useParams()
  return (
    <div className='ml-64'>{id}
    </div>
  )
}

export default ChartPreview