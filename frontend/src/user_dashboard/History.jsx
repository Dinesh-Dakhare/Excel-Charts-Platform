import React from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const History = ({ history }) => {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>UPLOAD HISTORY</h3>
      </div>
      <div className="history-list">
        {history.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>View Report</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  {/* ✅ Add data-label attributes for the new responsive view */}
                  <td data-label="File Name">{item.fileName}</td>
                  <td data-label="Upload Date">{new Date(item.date).toLocaleString()}</td>
                  <td data-label="View Report">
                    <Link to={`/dashboard/reports/${index}`} className="report-link-icon">
                      <BsBoxArrowUpRight /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>No files have been uploaded yet.</h4>
        )}
      </div>
    </main>
  );
};

export default History;
