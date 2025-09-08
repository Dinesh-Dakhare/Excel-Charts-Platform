import axios from 'axios';
import React, { useState } from 'react'
import { getChartsCreatedThisMonth } from '../lib/getChartsCreatedThisMonth ';

const MonthBarChart = () => {
  const [chart, setChart] = useState([]);
  const getFiledata = async () => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/v1/chart/chart-data',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    if (res.status === 200) {
      setChart(res.data);
      return (
        <div>
          {getChartsCreatedThisMonth(res.data)}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// render-chart-logic

  const chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [{
      label: 'Charts Created',
      data: Array.from({ length: 31 }, (_, i) => {
        const dayCharts = chartsThisMonth.filter((chart) => {
          const chartDate = new Date(chart.createdAt);
          return chartDate.getDate() === i + 1;
        });
        return dayCharts.length;
      }),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    title: {
      display: true,
      text: 'Charts Created This Month'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  return (
      <div>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default MonthBarChart