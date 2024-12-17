import { Link, useLocation } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import LogoImage from '../assets/images/Logo.png';
import ProfileImage1 from '../assets/images/UserProfile1.png';

export default function Header() {
  const location = useLocation(); // Untuk mendapatkan path aktif
  const currentPath = location.pathname;

  // Logika untuk menandai navigasi aktif
  const isHome = currentPath === '/';
  const isPayment = currentPath === '/payment';
  const isOrders = currentPath === '/orders';
  const isProfile = currentPath === '/profile';

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-4 z-50 
        ${isHome ? 'bg-white/30 backdrop-blur-md' : 'bg-white shadow-md'}`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/home">
          <img src={LogoImage} alt="Logo" className="h-8 w-26 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/payment"
          className={`font-medium ${
            isPayment ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
          }`}
        >
          Payment
        </Link>
        <Link
          to="/orders"
          className={`font-medium ${
            isOrders ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
          }`}
        >
          Orders
        </Link>
      </nav>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Notification Icon */}
        <button>
          <IoNotificationsOutline size={24} className="text-gray-700 hover:text-teal-600" />
        </button>

        {/* User Profile */}
        <div
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm ${
            isProfile ? 'bg-gray-100' : 'bg-gray-100/80'
          }`}
        >
          <img src={ProfileImage1} alt="User Profile" className="w-8 h-8 rounded-full" />
          <div className="text-gray-700">
            <p className="text-xs">Welcome back,</p>
            <p className="font-bold text-sm">Siddhesh</p>
          </div>
          <div className="text-gray-700">
            <span>▼</span>
          </div>
        </div>
      </div>
    </header>
  );
}
