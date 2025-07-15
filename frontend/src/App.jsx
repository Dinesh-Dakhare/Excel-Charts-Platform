import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import Account from './landing_page/Account'
import SignUp from './landing_page/SignUp'
import './landing_page/Account.css'

import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
