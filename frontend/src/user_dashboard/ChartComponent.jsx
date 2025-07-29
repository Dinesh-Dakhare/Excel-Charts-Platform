import React from 'react';
import { Bar, Line, Radar, Bubble, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale
);

const createGradient = (ctx, area) => {
  const colorStart = 'rgba(139, 92, 246, 0.7)';
  const colorEnd = 'rgba(236, 72, 153, 0.7)';
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

const ChartComponent = ({ excelData, labelKey, valueKey, type, title }) => {
  // ✅ DATA SANITIZATION: Ensure labels are strings and values are numbers
  const labels = excelData.map((row) => String(row[labelKey]));
  const values = excelData.map((row) => Number(row[valueKey]));

  const data = {
    labels,
    datasets: [
      {
        label: title || 'Excel Chart Data',
        data: type === 'bubble' 
              ? excelData.map(row => ({ x: String(row[labelKey]), y: Number(row[valueKey]), r: Math.random() * 20 + 5 })) 
              : (type === 'scatter' ? excelData.map(row => ({ x: String(row[labelKey]), y: Number(row[valueKey])})) : values),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          if (['line', 'radar'].includes(chart.config.type)) return 'rgba(139, 92, 246, 0.2)';
          if (['bubble', 'scatter'].includes(chart.config.type)) return 'rgba(139, 92, 246, 0.6)';
          return createGradient(ctx, chartArea);
        },
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: type === 'bar' ? 0 : 2,
        borderRadius: type === 'bar' ? 8 : undefined,
        fill: ['line', 'radar'].includes(type),
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
            color: '#ffffff'
        }
     },
     tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
     }
    },
    scales: {
      x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)'} },
      y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)'} },
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        pointLabels: { color: '#ffffff' },
        ticks: { color: '#ffffff', backdropColor: 'transparent' },
      }
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'radar':
        return <Radar data={data} options={options} />;
      case 'bubble':
        return <Bubble data={data} options={options} />;
      case 'scatter':
        return <Scatter data={data} options={options} />;
      case 'bar':
      default:
        return <Bar data={data} options={options} />;
    }
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div style={{ height: '400px' }}>{renderChart()}</div>
    </div>
  );
};

export default ChartComponent;