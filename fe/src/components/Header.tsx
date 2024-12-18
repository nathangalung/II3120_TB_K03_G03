import { Link, useLocation } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import LogoImage from '../assets/images/Logo.png';
import ProfileImage1 from '../assets/images/UserProfile1.png';
import { useUser } from '../contexts/User';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { userData } = useUser();

  const isHome = currentPath === '/home';
  const isPayment = currentPath === '/payment';
  const isOrder = currentPath === '/order';
  const isProfile = currentPath === '/profile';

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-4 z-50 
        ${isHome ? 'bg-white/30 backdrop-blur-md' : 'bg-white shadow-md'}`}
    >
      <div className="flex items-center space-x-2">
        <Link to="/home">
          <img src={LogoImage} alt="Logo" className="h-8 w-26 cursor-pointer" />
        </Link>
      </div>

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
          to="/order"
          className={`font-medium ${
            isOrder ? 'text-teal-600' : 'text-gray-700 hover:text-teal-600'
          }`}
        >
          Order
        </Link>
      </nav>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <button>
          <IoNotificationsOutline size={24} className="text-gray-700 hover:text-teal-600" />
        </button>

        <Link to="/profile">
          <div
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm cursor-pointer ${
              isProfile ? 'bg-gray-100' : 'bg-gray-100/80 hover:bg-gray-200'
            }`}
          >
            <img src={ProfileImage1} alt="User Profile" className="w-8 h-8 rounded-full" />
            <div className="text-gray-700">
              <p className="text-xs">Welcome back,</p>
              <p className="font-bold text-sm">{userData?.name || 'User'}</p>
            </div>
            <div className="text-gray-700">
              <span>▼</span>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;