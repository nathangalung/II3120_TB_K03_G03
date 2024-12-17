import React from 'react';

interface MenuProps {
  selectedService: string;
  onSelectService: (service: string) => void;
}

export default function Menu({ selectedService, onSelectService }: MenuProps) {
  return (
    <div className="w-full max-w-[300px] bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Service menu</h2>
      <div className="space-y-4">
        {[
          { label: 'Cleaning Service', hours: '6:00 - 18:00', key: 'cleaning' },
          { label: 'Water Delivery', hours: '6:00 - 18:00', key: 'water' },
          { label: 'Laundry Delivery', hours: '6:00 - 20:00', key: 'laundry' },
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
            <div className="text-xs">Available hours = {service.hours}</div>
          </button>
        ))}
      </div>
    </div>
  );
}