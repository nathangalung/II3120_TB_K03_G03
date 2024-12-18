import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import KostImage from '../assets/images/Kost.png';

type Card = {
  name: string;
  cardNumber: string;
  maidenName: string;
  expirationDate: string;
  isActive: boolean;
};

export default function PaymentPage() {
  const [cards, setCards] = useState<Card[]>([
    { name: 'Panji Yudhis', cardNumber: '1234', maidenName: 'Reni Kusumo', expirationDate: '12/34', isActive: true },
    { name: 'Farrel Sasko', cardNumber: '1234', maidenName: 'Jane Cooper', expirationDate: '12/34', isActive: false },
  ]);

  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | 'Semester' | 'Annual'>('Monthly');

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate('/home'); // Navigate to /home when called
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center space-x-2 text-gray-700">
        <button onClick={handleBackClick}>&larr;</button> {/* Attach onClick event */}
        <h1 className="text-lg font-medium">Payment</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="flex items-center text-gray-500">
          <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">1</div>
          <span className="ml-2 font-medium">Payment</span>
        </div>
        <div className="w-12 h-[2px] bg-gray-300"></div>
        <div className="flex items-center text-gray-300">
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">2</div>
          <span className="ml-2 font-medium">Confirm</span>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left Section: Registered Cards */}
        <div className="w-2/3 bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-md font-bold mb-4">Registered cards</h2>
          <div>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-md mb-2 ${
                  card.isActive ? 'bg-gray-100 border-l-4 border-teal-500' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input type="radio" checked={card.isActive} readOnly className="text-teal-500" />
                  <div>
                    <p className="text-sm font-bold">{card.name}</p>
                    <p className="text-xs text-gray-500">
                      {`**** **** **** ${card.cardNumber}`} • {card.maidenName}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500">{card.expirationDate}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <input type="radio" className="text-gray-400" />
            <span className="text-gray-500 text-sm">Add new card</span>
          </div>
          {/* Payment Plans */}
          <div className="flex justify-between mt-6">
            {['Monthly', 'Semester', 'Annual'].map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan as 'Monthly' | 'Semester' | 'Annual')}
                className={`w-1/3 py-2 text-center font-bold rounded-md ${
                  selectedPlan === plan
                    ? 'bg-teal-200 text-teal-700 shadow'
                    : 'bg-white border border-gray-200 text-gray-500'
                }`}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Cost Summary */}
        <div className="w-1/3 bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-md font-bold mb-4">Kos Expense</h2>
          <img src={KostImage} alt="Kost" className="rounded-lg mb-4" />
          <div className="text-gray-600 text-sm">
            <p className="mb-2">
              <span className="font-medium">Monthly</span>
            </p>
            <p className="mb-2">
              Cost rent: <span className="font-bold text-gray-800">Rp 2.500.000</span>
            </p>
            <p className="mb-2">
              Delayed penalty: <span className="font-bold text-gray-800">Rp 500.000 x 2</span>
            </p>
            <p className="mt-4 text-lg font-bold text-gray-800">
              Total cost: <span className="text-black">Rp 3.500.000</span>
            </p>
          </div>
          <button className="w-full mt-6 py-2 text-white font-bold bg-teal-500 rounded-md hover:bg-teal-600 transition">
            Review your order
          </button>
        </div>
      </div>
    </div>
  );
}
