import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsFileEarmarkBarGraphFill,
  BsUpload,
  BsClipboardData,
  BsClockHistory,
} from 'react-icons/bs';

function Home({ history }) {
  const reportCount = history.length;

  return (
    <main className='main-container'>
      <div className='main-title'><h3>DASHBOARD</h3></div>
      
      
      <div className='main-cards'>
        
        
        <div className="dashboard-row">
          <div className='card'>
            <div className='card-inner'>
              <h3>Reports Ready</h3>
              <BsFileEarmarkBarGraphFill className='card_icon' />
            </div>
            <h1>{reportCount}</h1>
          </div>

          <div className='card'>
            <div className='card-inner'>
              <h3>Upload History</h3>
              <BsClockHistory className='card_icon' />
            </div>
            <h1>{reportCount}</h1>
          </div>
        </div>
        
        
        <Link to="/dashboard/upload" className="card upload-card-link">
          <div className="card-inner upload-inner" >
            <BsUpload className="card_icon upload-icon" />
            <h3 style={{ marginTop: '10px' }}>Upload New File</h3>
            <p>Click here to analyze a new Excel file.</p>
          </div>
        </Link>

        {reportCount > 0 && (
          <div className="card report-card">
            <div className="card-inner">
                <BsClipboardData className='card_icon'/>
                <div>
                    <h3>View Latest Report</h3>
                    <p>Your newest report is ready to view.</p>
                    <Link to="/dashboard/reports/0" className="report-link">
                        Go to Report
                    </Link>
                </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;