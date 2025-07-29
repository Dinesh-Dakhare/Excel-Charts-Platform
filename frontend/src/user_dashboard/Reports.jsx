import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ChartComponent from './ChartComponent';
import ThreeDGraph from './ThreeDGraph';
import PieChart from './PieChart';
import { BsFileEarmarkArrowUp, BsDownload, BsGear, BsTable } from 'react-icons/bs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Reports = ({ history }) => {
  const { reportId } = useParams();
  const reportContentRef = useRef(null);

  const [keys, setKeys] = useState([]);
  const [config, setConfig] = useState(null);
  const [appliedConfig, setAppliedConfig] = useState(null);

  const reportData = history[reportId];

  useEffect(() => {
    if (reportData?.data?.length > 0) {
      const dataKeys = Object.keys(reportData.data[0]);
      setKeys(dataKeys);

      // ✅ ROBUSTNESS FIX: Handle cases with fewer than 2 columns
      const initialConfig = {
        chartType: 'bar',
        xAxisKey: dataKeys[0] || '',
        yAxisKey: dataKeys[1] || dataKeys[0] || '', // Fallback to the first key if second doesn't exist
        chartTitle: `Analytics for ${reportData.fileName}`,
      };
      setConfig(initialConfig);
      setAppliedConfig(initialConfig);
    }
  }, [reportId, reportData]);

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateChart = () => {
    setAppliedConfig(config);
  };

  const handleDownload = () => {
    const input = reportContentRef.current;
    // Set a dark background for the canvas to match the theme
    html2canvas(input, { backgroundColor: '#1d2634' }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`report-${reportData.fileName}.pdf`);
    });
  };

  if (history.length === 0) {
    return (
      <main className="main-container">
        <div className="no-reports-container">
          <BsFileEarmarkArrowUp className="no-reports-icon" />
          <h2>No Reports Generated</h2>
          <p>It looks like you haven't uploaded any files yet.</p>
          <Link to="/dashboard/upload" className="upload-link-button">
            Upload File
          </Link>
        </div>
      </main>
    );
  }

  if (!reportData || !reportData.data || reportData.data.length === 0) {
    // If the current report is invalid, redirect to the first valid one
    return <Navigate to="/dashboard/reports/0" />;
  }

  if (!appliedConfig || !config) {
    return (
        <main className='main-container'>
            <div className="status-container"><div className="loader"></div><h3>Loading Report...</h3></div>
        </main>
    );
  }

  const excelData = reportData.data;

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>Analytics Report</h3>
        <button onClick={handleDownload} className="download-button"><BsDownload /> Download Report</button>
      </div>
      <p className='report-file-name'>File: {reportData.fileName}</p>

      <div className="report-layout">
        <div className="report-config">
            <div className="chart-config-card">
                <div className="settings-card-header"><BsGear className="icon" /><h4>Chart Configuration</h4></div>
                <div className="config-form">
                    <div className="form-group">
                        <label>Chart Type</label>
                        <select name="chartType" value={config.chartType} onChange={handleConfigChange} className="config-select">
                            <option value="bar">Bar Chart</option>
                            <option value="line">Line Chart</option>
                            <option value="pie">Pie Chart</option>
                            <option value="doughnut">Doughnut Chart</option>
                            <option value="polarArea">Polar Area Chart</option>
                            <option value="radar">Radar Chart</option>
                            <option value="bubble">Bubble Chart</option>
                            <option value="scatter">Scatter Chart</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>X-Axis (Label)</label>
                        <select name="xAxisKey" value={config.xAxisKey} onChange={handleConfigChange} className="config-select">
                            {keys.map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Y-Axis (Value)</label>
                        <select name="yAxisKey" value={config.yAxisKey} onChange={handleConfigChange} className="config-select">
                            {keys.map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Chart Title</label>
                        <input type="text" name="chartTitle" value={config.chartTitle} onChange={handleConfigChange} className="config-input" placeholder="Enter chart title"/>
                    </div>
                    <button onClick={handleGenerateChart} className="generate-chart-btn">Generate Chart</button>
                </div>
            </div>
            <div className="data-preview-card">
                <div className="settings-card-header"><BsTable className="icon" /><h4>Data Preview</h4></div>
                <div className="table-container">
                    <table className="data-preview-table">
                        <thead><tr>{keys.map(key => <th key={key}>{key}</th>)}</tr></thead>
                        <tbody>{excelData.slice(0, 5).map((row, index) => (<tr key={index}>{keys.map(key => <td key={key}>{String(row[key])}</td>)}</tr>))}</tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="report-charts" ref={reportContentRef}>
            {['bar', 'line', 'radar', 'bubble', 'scatter'].includes(appliedConfig.chartType) && <ChartComponent excelData={excelData} labelKey={appliedConfig.xAxisKey} valueKey={appliedConfig.yAxisKey} type={appliedConfig.chartType} title={appliedConfig.chartTitle}/>}
            {['pie', 'doughnut', 'polarArea'].includes(appliedConfig.chartType) && <PieChart excelData={excelData} labelKey={appliedConfig.xAxisKey} valueKey={appliedConfig.yAxisKey} type={appliedConfig.chartType} title={appliedConfig.chartTitle}/>}
            <ThreeDGraph excelData={excelData} labelKey={appliedConfig.xAxisKey} valueKey={appliedConfig.yAxisKey} />
        </div>
      </div>
    </main>
  );
};

export default Reports;