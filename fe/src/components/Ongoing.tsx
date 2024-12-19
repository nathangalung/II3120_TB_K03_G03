import React, { useState, useEffect } from 'react';
import LaundryImage from '../assets/images/laundry/Laundry1.png';
import CleaningImage from '../assets/images/cleaning/Cleaning1.png';
import WaterImage from '../assets/images/water/Water1.png';

interface OngoingOrder {
  id: string;
  serviceType: string;
  status: string;
  totalPrice: number;
  details?: string;
  createdAt: string;
}

interface OngoingProps {
  orders: OngoingOrder[];
}

export default function Ongoing({ orders }: OngoingProps) {
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Initialize countdowns for PROGRESS orders
    const newCountdowns: { [key: string]: number } = {};
    orders.forEach(order => {
      if (order.status === 'PROGRESS') {
        newCountdowns[order.id] = 10;
      }
    });
    setCountdowns(newCountdowns);

    // Set up countdown timer
    const timer = setInterval(() => {
      setCountdowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(orderId => {
          if (updated[orderId] > 0) {
            updated[orderId] -= 1;
          }
          // When countdown reaches 0, update order status to COMPLETED
          if (updated[orderId] === 0) {
            fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({ status: 'COMPLETED' })
            });
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orders]);

  const getServiceImage = (serviceType: string) => {
    switch (serviceType) {
      case 'WATER':
        return WaterImage;
      case 'LAUNDRY':
        return LaundryImage;
      case 'CLEANING':
        return CleaningImage;
      default:
        return LaundryImage;
    }
  };

  const handleCancel = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'CANCELLED' })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Failed to cancel order');
    }
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={getServiceImage(order.serviceType)}
              alt="Provider"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-bold">{order.serviceType}</p>
              <p className="text-gray-500">Rp {order.totalPrice.toLocaleString()}</p>
              <p className={`text-sm ${
                order.status === 'PROGRESS' 
                  ? 'text-blue-500' 
                  : 'text-yellow-500'
              }`}>
                {order.status === 'PROGRESS' 
                  ? `Processing (${countdowns[order.id] || 0}s)` 
                  : 'Pending Payment'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {order.status === 'PENDING' && (
              <button
                onClick={() => handleCancel(order.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
            <div className="flex space-x-2 text-gray-400">
              {order.status === 'PROGRESS' ? (
                <>
                  <span className="text-blue-500">⏳</span>
                  <span>📦</span>
                  <span>🚚</span>
                  <span>✅</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-500">⏳</span>
                  <span className="text-gray-300">📦</span>
                  <span className="text-gray-300">🚚</span>
                  <span className="text-gray-300">✅</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}