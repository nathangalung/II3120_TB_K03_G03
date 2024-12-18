import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/Landing'
import HomePage from './pages/Home'
import ServicePage from './pages/Service'
import ProfilePage from './pages/Profile'
import KostPage from './pages/Kost'
import ConfirmPage from './pages/Confirm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/kost" element={<KostPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
    </Routes>
  );
}

export default App