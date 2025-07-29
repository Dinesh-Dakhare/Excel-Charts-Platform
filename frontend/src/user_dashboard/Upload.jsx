import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsUpload, BsFileEarmarkCheck } from 'react-icons/bs';
import * as ExcelJS from 'exceljs';

const Upload = ({ onDataUpdate }) => {
  // State to manage the upload process: 'idle', 'loading', 'success'
  const [uploadStatus, setUploadStatus] = useState('idle');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus('loading'); // Start loading animation

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          // Simulate a delay for analysis to make the loader visible
          await new Promise(resolve => setTimeout(resolve, 1500)); 

          const arrayBuffer = event.target.result;
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(arrayBuffer);
          const worksheet = workbook.getWorksheet(1);
          const jsonData = [];
          const headerRow = worksheet.getRow(1);
          const header = [];
          headerRow.eachCell((cell) => {
            header.push(cell.value);
          });
          for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            const rowData = {};
            row.eachCell((cell, colNumber) => {
              rowData[header[colNumber - 1]] = cell.value;
            });
            jsonData.push(rowData);
          }
          
          onDataUpdate(jsonData, file.name);
          setUploadStatus('success'); // Set status to success

        } catch (error) {
          console.error("Error parsing the Excel file:", error);
          alert("There was an error parsing the Excel file.");
          setUploadStatus('idle'); // Reset on error
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const renderContent = () => {
    switch (uploadStatus) {
      case 'loading':
        return (
          <div className="status-container">
            <div className="loader"></div>
            <h3>Analyzing File...</h3>
            <p>Please wait while we process your data.</p>
          </div>
        );
      case 'success':
        return (
          <div className="status-container">
            <BsFileEarmarkCheck className="success-icon" />
            <h3>Analysis Complete!</h3>
            <p>Your report is ready to be viewed.</p>
            <Link to="/dashboard/reports/0" className="report-link">
              Go to Report
            </Link>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="upload-inner">
            <BsUpload className="card_icon upload-icon" />
            <h3 style={{ marginBottom: '20px' }}>Upload Your Excel File</h3>
            <p style={{ marginBottom: '20px', color: '#9e9ea4' }}>
              Choose a .xlsx or .xls file to begin the analysis.
            </p>
            <label htmlFor="excel-upload" className="upload-link-button">
              📁 Choose File
            </label>
            <input
              id="excel-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="upload-input"
              disabled={uploadStatus === 'loading'} // Disable input while loading
            />
          </div>
        );
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>UPLOAD FILE</h3>
      </div>
      <div className="upload-page-card">
        {renderContent()}
      </div>
    </main>
  );
};

export default Upload;