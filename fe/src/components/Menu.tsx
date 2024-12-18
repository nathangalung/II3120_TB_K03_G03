import React from 'react';
import LaundryImage1 from "../assets/images/laundry/Laundry1.png";
import LaundryImage2 from "../assets/images/laundry/Laundry2.png";
import WaterImage1 from "../assets/images/laundry/Water1.png";
import WaterImage2 from "../assets/images/laundry/Water2.png";
import CleaningImage1 from "../assets/images/laundry/Cleaning1.png";
import CleaningImage2 from "../assets/images/laundry/Cleaning2.png";

interface MenuProps {
  selectedService: string;
  onSelectService: (service: string) => void;
}

export default function Menu({ selectedService, onSelectService }: MenuProps) {
  return (
    <div className="w-full max-w-[300px] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Service Menu</h2>
      <div className="space-y-4">
        {[
          { label: 'Water Delivery', hours: '6:00 - 18:00', key: 'water' },
          { label: 'Laundry Delivery', hours: '6:00 - 20:00', key: 'laundry' },
          { label: 'Cleaning Service', hours: '6:00 - 18:00', key: 'cleaning' },
          { label: 'Order History', hours: '', key: 'history' },
        ].map((service) => (
          <button
            key={service.key}
            onClick={() => onSelectService(service.key)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedService === service.key
                ? 'bg-[#76C7C0] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">{service.label}</div>
            {service.hours && <div className="text-xs">Available hours = {service.hours}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
