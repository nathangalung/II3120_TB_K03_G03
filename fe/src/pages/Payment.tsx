import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KostImage from '../assets/images/Kost.png';
import Header from '../components/Header';
import { useUser } from '../contexts/User';

type Card = {
  name: string;
  cardNumber: string;
  maidenName: string;
  expirationDate: string;
  isActive: boolean;
};

export default function PaymentPage() {
  const { userData } = useUser();
  const [cards, setCards] = useState<Card[]>([
    { name: 'Panji Yudhis', cardNumber: '1234', maidenName: 'Reni Kusumo', expirationDate: '12/34', isActive: true },
    { name: 'Farrel Sasko', cardNumber: '1234', maidenName: 'Jane Cooper', expirationDate: '12/34', isActive: false },
  ]);

  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | 'Semester' | 'Annual'>('Monthly');

  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate('/home'); // Navigate to /home when called
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/payment/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: `order-${Date.now()}`,
          gross_amount: 3500000, // Example amount
          user_id: userData?.id,
          name: userData?.name,
          phone: userData?.phone,
          email: userData?.email,
        }),
      });

      const data = await response.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            console.log('Payment success:', result);
            // Handle success
          },
          onPending: function (result) {
            console.log('Payment pending:', result);
            // Handle pending
          },
          onError: function (result) {
            console.log('Payment error:', result);
            // Handle error
          },
          onClose: function () {
            console.log('Payment popup closed');
            // Handle close
          },
        });
      } else {
        console.error('Failed to get transaction token');
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <div className="p-8 flex flex-col gap-6 pt-24">
        {/* Step Indicator */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="flex items-center text-teal-500">
            <div className="w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center font-bold">1</div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-300"></div>
          <div className="flex items-center text-gray-300">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold">2</div>
            <span className="ml-2 font-medium">Confirm</span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Section: Kos Expense */}
          <div className="w-1/2 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-md font-bold mb-4">Kos Expense</h2>
            <div className="rounded-lg overflow-hidden mb-4">
              <img src={KostImage} alt="Kost" className="w-full h-40 object-cover" />
            </div>
            <div className="text-gray-600 text-sm">
              <p className="mb-2">
                Cost rent: <span className="font-bold text-gray-800">Rp 2.500.000</span>
              </p>
              <p className="mb-2">
                Delayed penalty: <span className="font-bold text-gray-800">Rp 200.000 x 2 week</span>
              </p>
              <p className="mt-4 text-lg font-bold text-gray-800">
                Total cost: <span className="text-black">Rp 3.500.000</span>
              </p>
            </div>
          </div>

          {/* Right Section: Registered Cards */}
          <div className="w-1/2 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-md font-bold mb-4">Registered cards</h2>
            <div>
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-md mb-2 cursor-pointer border transition-all ${
                    card.isActive
                      ? 'bg-white border-teal-500 shadow-md'
                      : 'bg-gray-100 hover:bg-white hover:border-teal-500'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={card.isActive}
                      onChange={() => {
                        setCards((prev) =>
                          prev.map((c, i) => ({ ...c, isActive: i === index }))
                        );
                      }}
                      className="text-teal-500 cursor-pointer"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{card.name}</p>
                      <p className="text-xs text-gray-500">
                        {`**** **** **** ${card.cardNumber}`} &bull; {card.maidenName}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">{card.expirationDate}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <input type="radio" className="text-gray-400 cursor-pointer" />
              <span className="text-gray-500 text-sm">Add new card</span>
            </div>

            {/* Payment Plans */}
            <div className="flex justify-between mt-6">
              {['Monthly', 'Semester', 'Annual'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan as 'Monthly' | 'Semester' | 'Annual')}
                  className={`w-1/3 py-2 text-center font-bold rounded-md shadow-md transition-all ${
                    selectedPlan === plan
                      ? 'bg-teal-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-500'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-6 py-2 text-white font-bold bg-teal-500 rounded-md hover:bg-teal-600 transition"
            >
              Review your order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}