import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KostImage from '../assets/images/Kost.png';
import Header from '../components/Header';
import { useUser } from '../contexts/User';

declare global {
  interface Window {
    snap: any;
  }
}

type Card = {
  name: string;
  cardNumber: string;
  maidenName: string;
  expirationDate: string;
  isActive: boolean;
};

export default function KostPage() {
  const { userData } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<'1' | '3' | '6' | '12'>('1');
  const [kostStatus, setKostStatus] = useState({
    monthlyPrice: 2500000, // Set default value
    penaltyFee: 100000, // Set default value
    paymentStatus: 'UNPAID',
    delayDays: 0,
    totalCost: 0,
    continuousType: '0' // Add default value for continuousType
  });
  const navigate = useNavigate();
  const steps = ["Plan", "Payment", "Confirm"];
  const [currentStep, setCurrentStep] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (userData?.id) {
      fetch(`${API_URL}/api/kosts/status/${userData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setKostStatus(data.data);
          }
        })
        .catch(err => console.error('Error fetching kost status:', err));
    }
  }, [userData?.id]);

  const calculateTotalCost = () => {
    const basePrice = kostStatus.monthlyPrice * parseInt(selectedPlan);
    const penaltyFee = kostStatus.paymentStatus === 'DELAYED' ? 
      (kostStatus.penaltyFee * (kostStatus.delayDays || 0)) : 0;
    return basePrice + penaltyFee;
  };

  const handleKostPayment = async () => {
    try {
      const totalCost = calculateTotalCost();
      const details = JSON.stringify({
        calculation: `${selectedPlan} months × ${kostStatus.monthlyPrice} + ${kostStatus.delayDays || 0} days × ${kostStatus.penaltyFee}`,
        monthlyPrice: kostStatus.monthlyPrice,
        months: selectedPlan,
        penaltyDays: kostStatus.delayDays || 0,
        penaltyFee: kostStatus.penaltyFee
      });
  
      const response = await fetch(`${API_URL}/api/payment/create-transaction`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          order_id: `kost-${Date.now()}`,
          gross_amount: totalCost,
          user_id: userData?.id,
          name: userData?.name,
          phone: userData?.phone,
          email: userData?.email,
          payment_type: 'KOST',
          amount: parseInt(selectedPlan),
          totalPrice: totalCost,
          details: details
        }),
      });
  
      const data = await response.json();
  
      if (data.token) {
        setCurrentStep(1); // Move to Payment step
        window.snap.pay(data.token, {
          onSuccess: async function(result: any) {
            try {
              setCurrentStep(2); // Move to Confirm step
              
              // Update payment status
              await fetch(`${API_URL}/api/payment/${result.transaction_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: 'SUCCESS' })
              });
          
              // Update kost status with new continuous type
              const newContinuous = (parseInt(kostStatus.continuousType) + parseInt(selectedPlan)).toString();
              
              await fetch(`${API_URL}/api/kosts/status/${userData?.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                  paymentStatus: 'PAID',
                  continuousType: newContinuous // Use calculated continuous type
                })
              });
          
              window.location.href = '/confirm?from=kost';
            } catch (error) {
              console.error('Error processing successful payment:', error);
            }
          },
          onPending: function(result: any) {
            console.log('Payment pending:', result);
          },
          onError: function(result: any) {
            console.error('Payment error:', result);
            alert('Payment failed. Please try again.');
          },
          onClose: function() {
            console.log('Payment popup closed');
          }
        });
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Failed to initiate payment');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      <div className="p-8 flex-col gap-6 pt-24">
        {/* Progress Steps */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center ${
                idx === currentStep ? "text-[#76C7C0]" : "text-gray-300"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 ${
                  idx === currentStep ? "border-[#76C7C0]" : "border-gray-300"
                } flex items-center justify-center font-medium text-sm`}
              >
                {idx + 1}
              </div>
              <span className="ml-2 font-medium text-sm">{step}</span>
              {idx < steps.length - 1 && (
                <div className="w-16 h-[2px] bg-gray-200 mx-4"></div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto flex gap-6">
          <div className="flex-1 bg-gray-50 rounded-lg p-6 shadow-md">
            <h2 className="text-md font-bold mb-4">Kos Expense</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img src={KostImage} alt="Kost" className="w-full h-40 object-cover" />
                </div>
                <div className="text-gray-600 text-sm">
                  <p className="mb-2">
                    Monthly rent: <span className="font-bold text-gray-800">Rp {kostStatus.monthlyPrice.toLocaleString()}</span>
                  </p>
                  {kostStatus.paymentStatus === 'DELAYED' && (
                    <p className="mb-2 text-red-600">
                      Penalty fee: <span className="font-bold">Rp {(kostStatus.penaltyFee * (kostStatus.delayDays || 0)).toLocaleString()}</span>
                      <span className="text-xs ml-1">({kostStatus.delayDays} days × Rp {kostStatus.penaltyFee.toLocaleString()})</span>
                    </p>
                  )}
                  <p className="mt-4 text-lg font-bold text-gray-800">
                    Total cost: <span className="text-black">Rp {calculateTotalCost().toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-medium mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base Price/Month</span>
                    <span>Rp {kostStatus.monthlyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{selectedPlan} Month(s)</span>
                  </div>
                  {kostStatus.paymentStatus === 'DELAYED' && (
                    <div className="flex justify-between text-red-600">
                      <span>Penalty Fee</span>
                      <span>Rp {(kostStatus.penaltyFee * (kostStatus.delayDays || 0)).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span>Rp {calculateTotalCost().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Plans */}
            <div className="flex justify-between mt-6">
              {['1', '3', '6', '12'].map((months) => (
                <button
                  key={months}
                  onClick={() => setSelectedPlan(months as '1' | '3' | '6' | '12')}
                  className={`w-1/4 py-2 text-center font-bold rounded-md shadow-md transition-all ${
                    selectedPlan === months
                      ? 'bg-teal-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-500'
                  }`}
                >
                  {months} Month{months !== '1' ? 's' : ''}
                </button>
              ))}
            </div>

            <button
              onClick={handleKostPayment}
              className="w-full mt-6 py-2 text-white font-bold bg-teal-500 rounded-md hover:bg-teal-600 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}