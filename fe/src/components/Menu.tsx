import { FC } from 'react';
import type { MenuService } from '../types';
import LaundryImage1 from "../assets/images/services/Laundry1.png";
import LaundryImage2 from "../assets/images/services/Laundry2.png";
import WaterImage1 from "../assets/images/services/Water1.png";
import WaterImage2 from "../assets/images/services/Water2.png";
import CleaningImage1 from "../assets/images/services/Cleaning1.png";
import CleaningImage2 from "../assets/images/services/Cleaning2.png";

interface MenuProps {
  selectedService: string;
  onSelectService: (service: string) => void;
}

const Menu: FC<MenuProps> = ({ selectedService, onSelectService }) => {
  const services = [
    { 
      label: 'Water Delivery', 
      hours: '6:00 - 18:00', 
      key: 'water',
      image1: WaterImage1,
      image2: WaterImage2
    },
    { 
      label: 'Laundry Delivery', 
      hours: '6:00 - 20:00', 
      key: 'laundry',
      image1: LaundryImage1,
      image2: LaundryImage2
    },
    { 
      label: 'Cleaning Service', 
      hours: '6:00 - 18:00', 
      key: 'cleaning',
      image1: CleaningImage1,
      image2: CleaningImage2
    },
    { 
      label: 'Order History', 
      hours: '', 
      key: 'history',
      image1: null,
      image2: null
    }
  ];

  return (
    <div className="w-full max-w-[300px] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Service Menu</h2>
      <div className="space-y-4">
        {services.map((service) => (
          <button
            key={service.key}
            onClick={() => onSelectService(service.key)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedService === service.key
                ? 'bg-[#76C7C0] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {service.image1 && (
                <img 
                  src={selectedService === service.key ? service.image1 : service.image2} 
                  alt={service.label}
                  className="w-6 h-6 object-contain"
                />
              )}
              <div>
                <div className="font-medium">{service.label}</div>
                {service.hours && <div className="text-xs">Available hours = {service.hours}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;