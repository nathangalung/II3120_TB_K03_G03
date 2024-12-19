import LaundryImage from '../assets/images/laundry/Laundry1.png';
import CleaningImage from '../assets/images/cleaning/Cleaning1.png';
import WaterImage from '../assets/images/water/Water1.png';

interface CompletedOrder {
  id: string;
  serviceType: string;
  totalPrice: number;
  details: string;
  createdAt: string;
}

interface CompletedProps {
  orders: CompletedOrder[];
}

export default function Completed({ orders }: CompletedProps) {
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
              <p className="text-sm text-gray-400">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              {order.details && (
                <p className="text-sm text-gray-400">
                  {JSON.parse(order.details).type}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-yellow-500">⭐⭐⭐⭐</span>
          </div>
        </div>
      ))}
    </div>
  );
}