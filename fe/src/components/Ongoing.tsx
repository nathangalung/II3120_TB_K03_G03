interface OngoingProps {
    orders: any[];
}
  
export default function Ongoing({ orders }: OngoingProps) {
    return (
        <div>
        {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img
                src={order.serviceType === 'LAUNDRY' ? LaundryImage : CleaningImage}
                alt="Provider"
                className="w-16 h-16 rounded-full"
                />
                <div>
                <p className="font-bold">{order.serviceType}</p>
                <p className="text-gray-500">Rp {order.totalPrice.toLocaleString()}</p>
                </div>
            </div>
            <div className="flex space-x-2 text-gray-400">
                <span>⏳</span>
                <span>📦</span>
                <span>🚚</span>
                <span>✅</span>
            </div>
            </div>
        ))}
        </div>
    );
}