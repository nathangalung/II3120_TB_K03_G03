import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ConfirmImage from '../assets/images/Confirm.png';

export default function ConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isKostPayment = location.state?.from === 'kost';

  useEffect(() => {
    // Shorter timeout for better UX
    const timer = setTimeout(() => {
      if (isKostPayment) {
        navigate('/profile');
      } else {
        navigate('/service', { 
          state: { 
            showHistory: true  // Optional: to auto-show history tab
          } 
        });
      }
    }, 3000); // 3 seconds instead of 5

    return () => clearTimeout(timer);
  }, [navigate, isKostPayment]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="w-32 h-32 bg-[#EAF8F6] rounded-full flex items-center justify-center mb-6">
          <img src={ConfirmImage} alt="Payment Confirmation" className="w-16 h-16" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Your payment has been made
        </h1>
        <p className="mt-4 text-gray-600">
          Redirecting you back...
        </p>
      </div>
    </div>
  );
}