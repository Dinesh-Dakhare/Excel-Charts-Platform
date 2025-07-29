import React from 'react';
import { Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const nameColorMap = {
    sanket: 'rgba(0, 200, 83, 0.7)',
    om: 'rgba(255, 214, 0, 0.7)',
    vedant: 'rgba(255, 109, 0, 0.7)',
    dinesh: 'rgba(29, 233, 182, 0.7)',
    atharva: 'rgba(255, 171, 0, 0.7)',
    rohit: 'rgba(158, 158, 158, 0.7)',
    swapnil: 'rgba(126, 87, 194, 0.7)',
};
const defaultColor = 'rgba(41, 98, 255, 0.7)';

const PieChart = ({ excelData, labelKey, valueKey, type, title }) => {
  // ✅ DATA SANITIZATION: Ensure labels are strings and values are numbers
  const labels = excelData.map((row) => String(row[labelKey]));
  const values = excelData.map((row) => Number(row[valueKey]));
  
  // Assign colors based on the name map safely
  const backgroundColors = labels.map(label => nameColorMap[label.toLowerCase()] || defaultColor);

  const data = {
    labels: labels,
    datasets: [
      {
        label: title || 'Data Distribution',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
        borderWidth: 3,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            color: '#ffffff',
            boxWidth: 20,
            padding: 20,
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const meta = chart.getDatasetMeta(0);
                  const ds = data.datasets[0];
                  const fill = ds.backgroundColor[i];
                  const stroke = ds.borderColor[i];
                  const value = ds.data[i];
                  // ✅ ROBUSTNESS FIX: Ensure label is a string for display
                  return {
                    text: `${String(label)}: ${value}`,
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: 3,
                    fontColor: '#ffffff',
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              }
              return [];
            }
        },
      },
      tooltip: {
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
              label: function(context) {
                  let label = context.label || '';
                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed !== null) {
                      label += new Intl.NumberFormat('en-IN').format(context.parsed);
                  }
                  return label;
              }
          }
      }
    },
    scales:
      type === 'polarArea'
        ? {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
              grid: { color: 'rgba(255, 255, 255, 0.2)' },
              pointLabels: { color: '#ffffff' },
              ticks: { color: '#ffffff', backdropColor: 'transparent' },
            },
          }
        : {},
  };

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      case 'doughnut':
      default:
        return <Doughnut data={data} options={options} />;
    }
  };

  return (
    <div className="chart-container">
       <h3 className="chart-title" style={{ color: '#ffffff' }}>{title}</h3>
      <div style={{ height: '400px' }}>{renderChart()}</div>
    </div>
  );
};

export default PieChart;