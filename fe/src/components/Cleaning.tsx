import { FC } from 'react';
import { Service } from '../types';
import CleaningImage from '../assets/images/cleaning/Cleaning1.png';

interface CleaningProps {
  services: Service[];
  selectedService: string | null;
  onSelectService: (id: string) => void;
  onDurationChange: (duration: number) => void;
}

const Cleaning: FC<CleaningProps> = ({ services, selectedService, onSelectService, onDurationChange }) => {
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
                <img src={CleaningImage} alt="Provider" className="w-16 h-16 rounded-full" />
                <div>
                <p className="font-bold">{service.name}</p>
                <p className="text-gray-500">Time: {service.timeAvailable}</p>
                <select 
                    className="mt-2 px-2 py-1 border rounded"
                    onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    console.log('Selected duration:', value);
                    onDurationChange(value);
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent card selection when clicking dropdown
                >
                    <option value="">Select Duration</option>
                    <option value="0.5">30 Minutes</option>
                    <option value="1">60 Minutes</option>
                    <option value="1.5">90 Minutes</option>
                    <option value="2">120 Minutes</option>
                </select>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-[#76C7C0]">Rp {service.price.toLocaleString()}/hr</p>
                <p className="text-yellow-500">⭐ {service.rating}/5.0</p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default Cleaning;