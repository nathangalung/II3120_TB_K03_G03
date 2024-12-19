import React from 'react';
import LaundryImage from '../assets/images/laundry/Laundry1.png';

interface LaundryProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (id: string) => void;
  onDetailsChange: (details: any) => void;
}

export default function Laundry({ services, selectedService, onSelectService, onDetailsChange }: LaundryProps) {
    return (
        <div>
        {services.map((service) => (
            <div
            key={service.id}
            className={`bg-white p-6 rounded-lg shadow-md mb-4 flex justify-between cursor-pointer ${
                selectedService === service.id ? 'border-2 border-[#76C7C0]' : ''
            }`}
            onClick={() => onSelectService(service.id)}
            >
            <div className="flex items-center space-x-4">
                <img src={LaundryImage} alt="Provider" className="w-16 h-16 rounded-full" />
                <div>
                <p className="font-bold">{service.brand}</p>
                <p className="text-gray-500">Time: {service.timeAvailable}</p>
                <p className="text-[#76C7C0] font-medium">Rp {service.clothPrice?.toLocaleString()}/kg</p>
                <div className="mt-2 space-y-2">
                    <input 
                    type="number"
                    placeholder="Cloth Weight (kg)"
                    className="w-full px-2 py-1 border rounded"
                    onChange={(e) => onDetailsChange({
                        clothWeight: parseFloat(e.target.value),
                        price: service.clothPrice || 0
                    })}
                    />
                </div>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-[#76C7C0]">⭐ {service.rating}/5.0</p>
            </div>
            </div>
        ))}
        </div>
    );
}