import { FC } from 'react';
import { Service } from '../types';
import WaterImage from "../assets/images/water/Water1.png";

interface WaterProps {
    services: Service[];
    waterOrder: number[];
    onQuantityChange: (index: number, delta: number) => void;
}

export default function Water({ services, waterOrder, onQuantityChange }: WaterProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, idx) => (
            <div
            key={service.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
            <img src={WaterImage} alt="Water" className="w-16 h-16" />
            <div>
                <p className="font-bold">{service.brand} {service.size}</p>
                <p className="text-gray-500">Rp {service.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                onClick={() => onQuantityChange(idx, -1)}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                -
                </button>
                <span>{waterOrder[idx] || 0}</span>
                <button
                onClick={() => onQuantityChange(idx, 1)}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                +
                </button>
            </div>
            </div>
        ))}
        </div>
    );
}
