import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  RadialLinearScale,
} from 'chart.js'

import { Chart } from 'react-chartjs-2'
import { generateRandomColors } from '../lib/colorgenerator'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)

export const ChartRender = ({
  chartTitle,
  chartType,
  chartLabels,
  chartData,
  yField,
  xField,
 ref 
}) => {
  let barLength = chartData.length
  const { bgColors, borderColors } = generateRandomColors(barLength)
console.log("chart-labels",chartLabels);
console.log("chart-data",chartData);
console.log("chart-xfield",xField);
console.log("chart-yfield",yField);

  
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: yField,
        data: chartData,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  }

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartTitle || 'My Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xField,
        },
      },
      y: {
        title: {
          display: true,
          text: yField,
        },
      },
    },
  }

  return (
    <div className='w-full max-w-[60rem]  h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] xl:h-[40rem] shadow rounded-xl flex items-center justify-center'>
      <Chart
      ref={ref}
        key={`${chartType}-${xField}-${yField}`}
        type={chartType}
        data={data}
        options={options}
      />
    </div>
  )
}

export default ChartRender
