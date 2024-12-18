import { useState, useEffect } from "react"
import { useUser } from '../contexts/User';
import Header from "../components/Header"
import Menu from "../components/Menu"
import Water from "../components/Water"
import Laundry from "../components/Laundry"
import Cleaning from "../components/Cleaning"
import Ongoing from "../components/Ongoing"
import Completed from "../components/Completed"

interface Service {
  id: string;
  brand?: string;
  name?: string;
  timeAvailable?: string;
  location: string;
  price: number;
  rating?: number;
  size?: string;
  clothPrice?: number;
  helmPrice?: number;
  bedcoverPrice?: number;
}

export default function ServicePage() {
  const { userData } = useUser();
  const [selectedService, setSelectedService] = useState("cleaning");
  const [waterServices, setWaterServices] = useState<Service[]>([]);
  const [laundryServices, setLaundryServices] = useState<Service[]>([]);
  const [cleaningServices, setCleaningServices] = useState<Service[]>([]);
  const [waterOrder, setWaterOrder] = useState<number[]>([]); // Keep only one declaration
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLaundryService, setSelectedLaundryService] = useState<string | null>(null);
  const [selectedCleaningService, setSelectedCleaningService] = useState<string | null>(null);
  const [laundryDetails, setLaundryDetails] = useState({
    clothWeight: 0,
    helmQuantity: 0,
    bedcoverQuantity: 0
  });
  const [cleaningDuration, setCleaningDuration] = useState(0);
  const [orders, setOrders] = useState({
    ongoing: [],
    completed: []
  });
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Order", "Payment", "Confirm", "Delivery"];

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [waterRes, laundryRes, cleaningRes] = await Promise.all([
          fetch('http://localhost:3000/api/services/water'),
          fetch('http://localhost:3000/api/services/laundry'),
          fetch('http://localhost:3000/api/services/cleaning')
        ]);
  
        const waterData = await waterRes.json();
        const laundryData = await laundryRes.json();
        const cleaningData = await cleaningRes.json();
  
        if (!waterRes.ok) throw new Error(waterData.error);
        if (!laundryRes.ok) throw new Error(laundryData.error);
        if (!cleaningRes.ok) throw new Error(cleaningData.error);
  
        setWaterServices(waterData.data || []);
        setLaundryServices(laundryData.data || []);
        setCleaningServices(cleaningData.data || []);
        setWaterOrder(new Array(waterData.data.length).fill(0));
      } catch (error) {
        setError('Failed to fetch services: ' + (error instanceof Error ? error.message : 'Unknown error'));
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchServices();
  }, []);

  useEffect(() => {
    if (userData?.id) {
      fetch(`http://localhost:3000/api/orders/user/${userData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrders({
              ongoing: data.data.filter((order: any) => order.status === 'PENDING' || order.status === 'PROCESSING'),
              completed: data.data.filter((order: any) => order.status === 'COMPLETED')
            });
          }
        })
        .catch(err => console.error('Error fetching orders:', err));
    }
  }, [userData?.id]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  const handleQuantityChange = (index: number, delta: number) => {
    setWaterOrder((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(qty + delta, 0) : qty))
    )
  }

  const handleOrderSubmit = async () => {
    if (!userData?.id) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    try {
      let orderItems: any[] = [];

      switch (selectedService) {
        case "water":
          orderItems = waterServices
            .filter((_, idx) => waterOrder[idx] > 0)
            .map((service, idx) => ({
              id: service.id,
              quantity: waterOrder[idx],
              price: service.price
            }));
          break;

        case "laundry":
          // Add laundry specific order items
          break;

        case "cleaning":
          // Add cleaning specific order items
          break;
      }

      if (orderItems.length === 0) {
        alert("Please select items to order");
        return;
      }

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: userData.id,
          serviceType: selectedService,
          items: orderItems
        })
      });

      const data = await response.json();
      if (data.success) {
        alert("Order placed successfully!");
        // Reset order state
        setWaterOrder(new Array(waterServices.length).fill(0));
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServicePayment = async () => {
    if (!userData?.id) {
      alert("Please login first");
      return;
    }
  
    setLoading(true);
    try {
      let totalAmount = 0;
      let orderItems: any[] = [];
      let details = '';
  
      switch (selectedService) {
        case "water":
          orderItems = waterServices
            .filter((_, idx) => waterOrder[idx] > 0)
            .map((service, idx) => {
              const itemTotal = service.price * waterOrder[idx];
              totalAmount += itemTotal;
              return {
                id: service.id,
                quantity: waterOrder[idx],
                price: service.price,
                total: itemTotal
              };
            });
          if (orderItems.length === 0) {
            alert("Please select water quantity");
            setLoading(false);
            return;
          }
          details = JSON.stringify({
            type: 'WATER',
            items: orderItems.map(item => `${item.quantity} × Rp ${item.price}`)
          });
          break;
  
        case "laundry":
          if (!selectedLaundryService || laundryDetails.clothWeight <= 0) {
            alert("Please select a laundry service and enter cloth weight");
            setLoading(false);
            return;
          }
          const selectedLaundryItem = laundryServices.find(s => s.id === selectedLaundryService);
          if (selectedLaundryItem) {
            const total = selectedLaundryItem.clothPrice! * laundryDetails.clothWeight;
            totalAmount = total;
            orderItems = [{
              id: selectedLaundryItem.id,
              quantity: laundryDetails.clothWeight,
              price: selectedLaundryItem.clothPrice,
              total
            }];
            details = JSON.stringify({
              type: 'LAUNDRY',
              clothWeight: laundryDetails.clothWeight
            });
          }
          break;
  
        case "cleaning":
          if (!selectedCleaningService || cleaningDuration <= 0) {
            alert("Please select a cleaning service and duration");
            setLoading(false);
            return;
          }
          const selectedCleaningItem = cleaningServices.find(s => s.id === selectedCleaningService);
          if (selectedCleaningItem) {
            const total = selectedCleaningItem.price * cleaningDuration;
            totalAmount = total;
            orderItems = [{
              id: selectedCleaningItem.id,
              quantity: cleaningDuration,
              price: selectedCleaningItem.price,
              total
            }];
            details = JSON.stringify({
              type: 'CLEANING',
              duration: cleaningDuration
            });
          }
          break;
      }
  
      // Create payment transaction
      const response = await fetch('http://localhost:3000/api/payment/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          order_id: `${selectedService}-${Date.now()}`,
          gross_amount: totalAmount,
          user_id: userData.id,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          payment_type: selectedService.toUpperCase(),
          amount: selectedService === 'water' ? 
            orderItems.reduce((sum, item) => sum + item.quantity, 0) : 
            orderItems[0]?.quantity || 0,
          totalPrice: totalAmount,
          details: details
        })
      });
  
      const data = await response.json();
  
      if (data.token) {
        setCurrentStep(1); // Move to Payment step
        window.snap.pay(data.token, {
          onSuccess: async function(result: any) {
            try {
              setCurrentStep(2); // Move to Confirm step
              
              // Create order after successful payment
              const orderResponse = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                  userId: userData.id,
                  serviceType: selectedService,
                  items: orderItems,
                  status: 'COMPLETED',
                  amount: selectedService === 'water' ? 
                    orderItems.reduce((sum, item) => sum + item.quantity, 0) : 
                    orderItems[0]?.quantity || 0,
                  totalPrice: totalAmount,
                  details: details,
                  paymentId: result.transaction_id
                })
              });
          
              const orderData = await orderResponse.json();
              if (orderData.success) {
                // Update payment status
                await fetch(`http://localhost:3000/api/payment/${result.transaction_id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify({ status: 'SUCCESS' })
                });
          
                // First navigate to confirm page
                navigate('/confirm', { state: { from: 'service' } });
                
                // Set timeout for processing status
                setTimeout(() => {
                  fetch(`http://localhost:3000/api/orders/${orderData.id}/status`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ status: 'PROCESSING' })
                  });
                }, 10000);
          
                // Reset states
                setWaterOrder(new Array(waterServices.length).fill(0));
                setSelectedLaundryService(null);
                setSelectedCleaningService(null);
                setLaundryDetails({ clothWeight: 0, helmQuantity: 0, bedcoverQuantity: 0 });
                setCleaningDuration(0);
              }
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
      console.error('Error creating order:', error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <Menu selectedService={selectedService} onSelectService={setSelectedService} />

          <div className="flex-1 overflow-auto max-h-[calc(100vh-200px)] rounded-lg bg-white p-6 shadow-lg">
            {selectedService === "water" && (
              <Water 
                services={waterServices} 
                waterOrder={waterOrder} 
                onQuantityChange={handleQuantityChange} 
              />
            )}
            {selectedService === "laundry" && (
              <Laundry 
                services={laundryServices}
                selectedService={selectedLaundryService}
                onSelectService={setSelectedLaundryService}
                onDetailsChange={(details) => setLaundryDetails(prev => ({ ...prev, ...details }))}
              />
            )}
            {selectedService === "cleaning" && (
              <Cleaning 
                services={cleaningServices}
                selectedService={selectedCleaningService}
                onSelectService={setSelectedCleaningService}
                onDurationChange={setCleaningDuration}
              />
            )}
            {selectedService === "history" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Ongoing Orders</h2>
                  <Ongoing orders={orders.ongoing} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
                  <Completed orders={orders.completed} />
                </div>
              </div>
            )}
            
            {selectedService !== "history" && (
              <button 
                className="w-full mt-6 bg-[#76C7C0] text-white py-3 rounded-lg font-medium hover:bg-[#5ba9a1] transition-colors"
                onClick={handleServicePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : "Order Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

