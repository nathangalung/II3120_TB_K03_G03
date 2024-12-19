import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ConfirmImage from '../assets/images/Confirm.png';

const ConfirmPage: FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get('from');
    const isKostPayment = from === 'kost';
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (isKostPayment) {
          window.location.href = '/profile';
        } else {
          window.location.href = '/service';
        }
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [isKostPayment]);
  
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
  };

export default ConfirmPage;