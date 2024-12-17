import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/Landing'
import HomePage from './pages/Home'
import OrderPage from './pages/Order'
import ProfilePage from './pages/Profile'
import PaymentPage from './pages/Payment'

function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li><Link to="/">Landing</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/service">Service</Link></li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  )
}

export default App