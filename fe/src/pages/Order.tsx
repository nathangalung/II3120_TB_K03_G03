import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ProviderImage from '../assets/images/ProviderProfile.png';
import WaterImage from '../assets/images/Water.png';

export default function OrderPage() {
  const [selectedService, setSelectedService] = useState('cleaning');

  // State untuk jumlah item pada Water Delivery
  const [waterOrder, setWaterOrder] = useState([0, 0, 0, 0]);

  const handleQuantityChange = (index: number, delta: number) => {
    setWaterOrder((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(qty + delta, 0) : qty))
    );
  };

  const renderServiceContent = () => {
    switch (selectedService) {
      case 'cleaning':
        return (
          <>
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md mb-4"
              >
                <div className="flex items-center space-x-4">
                  <img src={ProviderImage} alt="Provider" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">Garry Allen</p>
                    <p className="text-sm text-gray-500">Jl. Rancaekek, Jatinangor</p>
                    <p className="text-xs font-medium">Time Available: 12:00 - 18:00</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#76C7C0]">Price: Rp 120.000</p>
                  <p className="text-sm text-yellow-500">⭐ 4.6/5.0</p>
                </div>
              </div>
            ))}
          </>
        );
      case 'water':
        return (
          <div className="grid grid-cols-2 gap-6">
            {waterOrder.map((qty, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white rounded-lg p-4 shadow-md"
              >
                <img src={WaterImage} alt="Water" className="w-16 h-16 mb-2" />
                <p className="text-sm font-bold mb-1">Le Minerale 15L</p>
                <p className="text-sm mb-2">Rp 19.000</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(idx, -1)}
                    className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-sm">{qty}</span>
                  <button
                    onClick={() => handleQuantityChange(idx, 1)}
                    className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'laundry':
        return (
          <>
            {[1, 2].map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-md mb-4">
                <div className="flex items-center space-x-4">
                  <img src={ProviderImage} alt="Provider" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">Quantum</p>
                    <p className="text-sm text-gray-500">Jl. Rancaekek, Jatinangor</p>
                    <p className="text-xs font-medium">Time Available: 12:00 - 18:00</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <p>
                    Clothes: <span className="font-bold">Rp 20.000/Kg</span>
                  </p>
                  <p>
                    Bedcover: <span className="font-bold">Rp 30.000/Kg</span>
                  </p>
                  <p>
                    Helm: <span className="font-bold">Rp 30.000/Kg</span>
                  </p>
                  <p>
                    Others: <span className="font-bold">To be discussed</span>
                  </p>
                </div>
              </div>
            ))}
          </>
        );
      default:
        return <p>No service selected.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex gap-6 py-8 px-4">
        {/* Service Menu */}
        <Menu selectedService={selectedService} onSelectService={setSelectedService} />

        {/* Service Content */}
        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-lg">
          {renderServiceContent()}
          <div className="flex justify-end mt-6">
            <button className="bg-[#76C7C0] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#5ba9a1]">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
