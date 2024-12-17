import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BackgroundImage from '../assets/images/Background.png';

export default function HomePage() {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/order');
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          What is <span className="text-[#2A9D8F]">RooMAH</span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-lg max-w-2xl mb-12 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled.
        </p>

        {/* Service Icons */}
        <div className="flex space-x-12 mb-12">
          {/* Galoon */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border border-white rounded-lg flex items-center justify-center bg-white/10">
              <img src="https://img.icons8.com/ios/50/ffffff/water.png" alt="Galoon" />
            </div>
            <p className="mt-2 text-sm font-medium">Galoon</p>
          </div>

          {/* Laundry */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border border-white rounded-lg flex items-center justify-center bg-white/10">
              <img src="https://img.icons8.com/ios/50/ffffff/t-shirt.png" alt="Laundry" />
            </div>
            <p className="mt-2 text-sm font-medium">Laundry</p>
          </div>

          {/* Cleaning Service */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border border-white rounded-lg flex items-center justify-center bg-white/10">
              <img
                src="https://img.icons8.com/ios/50/ffffff/cleaning.png"
                alt="Cleaning Service"
              />
            </div>
            <p className="mt-2 text-sm font-medium">Cleaning Service</p>
          </div>
        </div>

        {/* View More Button */}
        <button
          onClick={handleViewMore}
          className="bg-[#2A9D8F] hover:bg-[#248274] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          View More
        </button>
      </div>
    </div>
  );
}
