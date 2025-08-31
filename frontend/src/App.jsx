import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Home from './pages/Home.jsx'
import ExcelToChartUpload from './pages/ExcelToChartUpload.jsx'
import { Setting } from './pages/Setting.jsx'
import History from './pages/History.jsx'
import UserDashboardLayout from './layout/UserDashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Report from './pages/Report.jsx'
import AuthPage from './pages/AuthPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ChartPreview from './pages/ChartPreview.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboardLayout from './layout/AdminDashboardLayout.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import UserList from './pages/UserList.jsx'
import AdminChartPreview from './pages/AdminChartPreview.jsx'
import ForgetPasswordPage from './pages/ForgetPasswordPage.jsx'
// Pass history to the layout
const DashboardLayout = ({
  openSidebarToggle,
  OpenSidebar,
  theme,
  handleLogout,
  user,
  history,
}) => (
  <div className={`grid-container ${theme}`}>
    <Header OpenSidebar={OpenSidebar} />
    {/* Pass history to the Sidebar */}
    <Sidebar
      openSidebarToggle={openSidebarToggle}
      OpenSidebar={OpenSidebar}
      handleLogout={handleLogout}
      user={user}
      history={history}
    />
    <Outlet />
  </div>
)

const AppWrapper = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Account />} /> */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthPage mode='login' />} />
      <Route path='/register' element={<AuthPage mode='register' />} />
      <Route path='/forget-password' element={<ForgetPasswordPage mode='forget-password'/>} />
      <Route path='/reset-password' element={<ForgetPasswordPage mode='reset-password'/>} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <UserDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard/user' element={<Dashboard />} />
        <Route path='/dashboard/upload' element={<ExcelToChartUpload />} />
        <Route path='/dashboard/settings' element={<Setting />} />
        <Route path='/dashboard/history' element={<History />} />
        <Route path='/dashboard/chart/:id' element={<ChartPreview />} />

        <Route path='/dashboard/user' element={<Dashboard />} />
        <Route path='/dashboard/report' element={<Report />} />
      </Route>

         <Route
        path='/admin'
        element={
        
            <AdminDashboardLayout />
          
        }
      >
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/report/:id' element={<AdminChartPreview />} />
        <Route path='/admin/report' element={<UserList />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
