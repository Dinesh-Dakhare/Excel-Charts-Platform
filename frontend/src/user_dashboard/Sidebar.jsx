import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsClockHistory,
  BsFileEarmarkArrowUpFill,
  BsBarChartFill,
  BsFillGearFill,
  BsBoxArrowRight,
  BsPersonCircle,
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar, handleLogout, user }) {
  const location = useLocation();

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>Excel Analytics</div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <div className="sidebar-profile">
        <BsPersonCircle className="profile-icon" />
        <div className="profile-name">{user.name}</div>
      </div>
      <ul className='sidebar-list'>
        <li className={`sidebar-list-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <Link to="/dashboard">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname.startsWith('/dashboard/reports') ? 'active' : ''}`}>
          <Link to="/dashboard/reports/0">
            <BsBarChartFill className='icon' /> Reports
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/dashboard/history' ? 'active' : ''}`}>
          <Link to="/dashboard/history">
            <BsClockHistory className='icon' /> History
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/dashboard/upload' ? 'active' : ''}`}>
          <Link to="/dashboard/upload">
            <BsFileEarmarkArrowUpFill className='icon' /> Upload File
          </Link>
        </li>
        <li className={`sidebar-list-item ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}>
          <Link to="/dashboard/settings">
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
        <li className="sidebar-list-item logout-item" onClick={handleLogout}>
          <div className="logout-link">
            <BsBoxArrowRight className='icon' /> Logout
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;