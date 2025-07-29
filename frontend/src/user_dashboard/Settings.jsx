import React, { useState } from 'react';
import { BsPersonCircle, BsPalette, BsBell } from 'react-icons/bs';
import './App.css'; 

const Settings = ({ user, setUser, theme, setTheme }) => {
  // Local state for notifications can remain here if it doesn't affect other components
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  // Handler for controlled input components
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  
  const handleUpdateProfile = () => {
      // Here you would typically make an API call to save the user data
      alert(`Profile updated for ${user.name}`);
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };
  
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>SETTINGS</h3>
      </div>

      <div className="settings-container">
        {/* Profile Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <BsPersonCircle className="icon" />
            <h4>Profile Information</h4>
          </div>
          <div className="settings-card-body">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className="settings-input" 
                value={user.name} 
                onChange={handleUserChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="settings-input" 
                value={user.email} 
                onChange={handleUserChange} 
              />
            </div>
            <button className="settings-button" onClick={handleUpdateProfile}>Update Profile</button>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <BsPalette className="icon" />
            <h4>Theme Customization</h4>
          </div>
          <div className="settings-card-body">
            <p>Select your preferred interface theme.</p>
            <div className="theme-options">
              <div 
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </div>
              <div 
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <BsBell className="icon" />
            <h4>Notification Preferences</h4>
          </div>
          <div className="settings-card-body">
            <div className="toggle-group">
              <label htmlFor="email-notifications">Email Notifications</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="email-notifications" 
                  name="email"
                  checked={notifications.email} 
                  onChange={handleNotificationChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-group">
              <label htmlFor="push-notifications">Push Notifications</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  id="push-notifications" 
                  name="push"
                  checked={notifications.push} 
                  onChange={handleNotificationChange} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;