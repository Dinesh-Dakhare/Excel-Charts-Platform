import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Account from '../landing_page/Account';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Reports from './Reports';
import History from './History';
import Upload from './Upload';
import Settings from './Settings';
import Search from './Search'; // Import the Search component
import './App.css';

// Pass history to the layout
const DashboardLayout = ({ openSidebarToggle, OpenSidebar, theme, handleLogout, user, history }) => (
  <div className={`grid-container ${theme}`}>
    <Header OpenSidebar={OpenSidebar} />
    {/* Pass history to the Sidebar */}
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} handleLogout={handleLogout} user={user} history={history} />
    <Outlet /> 
  </div>
);

const AppWrapper = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [history, setHistory] = useState([]);
    const [theme, setTheme] = useState('dark');
    const [user, setUser] = useState({
        name: 'Demo User',
        email: 'demo.user@example.com',
    });
    const navigate = useNavigate();

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    
    const handleDataUpdate = (newData, fileName) => {
        const newHistoryEntry = { fileName, date: new Date(), data: newData };
        setHistory(prevHistory => [newHistoryEntry, ...prevHistory]);
    };

    const handleLogout = () => {
        navigate('/');
    };
  
    useEffect(() => {
        document.body.className = `${theme}-theme`;
    }, [theme]);

    return (
        <Routes>
            <Route path="/" element={<Account />} />
            <Route 
                path="/dashboard" 
                element={<DashboardLayout openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} theme={theme} handleLogout={handleLogout} user={user} history={history}/>}
            >
                <Route index element={<Home history={history} />} />
                <Route path="reports/:reportId" element={<Reports history={history} />} />
                <Route path="history" element={<History history={history} />} />
                <Route path="upload" element={<Upload onDataUpdate={handleDataUpdate} />} />
                <Route path="settings" element={<Settings user={user} setUser={setUser} theme={theme} setTheme={setTheme} />} />
                <Route path="search" element={<Search />} /> {/* Add search route */}
            </Route>
        </Routes>
    );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;