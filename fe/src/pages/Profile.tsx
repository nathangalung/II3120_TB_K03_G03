import Header from '../components/Header';
import KostImage from '../assets/images/Kost.png';
import ProfileImage2 from '../assets/images/UserProfile2.png';
import PieChart from '../assets/images/Pie.png';
import { useUser } from '../contexts/User';
import { useAuth } from '../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { userData, setUserData } = useUser();
  const { logout } = useAuth();
  const [kostData, setKostData] = useState({ location: '', rating: 0 });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [kostStatus, setKostStatus] = useState({
    paymentStatus: 'UNPAID',
    continuousType: '0',
    delayDays: 0
  });
  const navigate = useNavigate();
  const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000';


  useEffect(() => {
    if (userData?.id) {
      const fetchKostStatus = () => {
        fetch(`${API_URL}/api/kosts/status/${userData.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setKostStatus(data.data);
            }
          })
          .catch(err => console.error('Error fetching kost status:', err));
      };
  
      fetchKostStatus();
      // Refresh status every 30 seconds
      const intervalId = setInterval(fetchKostStatus, 30000);
  
      return () => clearInterval(intervalId);
    }
  }, [userData?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-emerald-500 bg-emerald-50';
      case 'UNPAID': return 'text-yellow-500 bg-yellow-50';
      case 'DELAYED': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  useEffect(() => {
    if (userData?.kostName) {
      fetch(`${API_URL}/api/kosts?name=${userData.kostName}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setKostData({
              location: data.data.location,
              rating: data.data.rating
            });
          }
        })
        .catch(error => console.error('Error fetching kost data:', error));
    }
  }, [userData?.kostName]);

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (!isEditing || !userData?.id) return;

    try {
      const response = await fetch(`${API_URL}/api/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          [isEditing]: editValue
        })
      });

      const data = await response.json();
      if (data.success) {
        setUserData({
          ...userData,
          [isEditing]: editValue
        });
        setIsEditing(null);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderEditableField = (item: { label: string; value: string }) => (
    <div key={item.label} className="space-y-1">
      <p className="text-gray-600 text-sm">{item.label}</p>
      <div className="flex justify-between items-center">
        {isEditing === item.label.toLowerCase() ? (
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
            />
            <button
              onClick={handleSave}
              className="text-sm bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(null)}
              className="text-sm bg-gray-500 text-white px-4 py-1.5 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-900">{item.value}</p>
            <button
              onClick={() => handleEdit(item.label.toLowerCase(), item.value)}
              className="text-sm bg-[#F5F5F5] text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Header />

      <section className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#2A9D8F] rounded-2xl p-6 text-white mb-8 flex items-center justify-between">
          <h2 className="font-semibold text-xl tracking-wide">MY PROFILE</h2>
          <button className="bg-white/90 text-[#2A9D8F] px-6 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
            My Data
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={ProfileImage2}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <button className="text-sm bg-[#F5F5F5] text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Upload Photo
              </button>
            </div>

            <div className="space-y-6">
              <div className='p-2 border-2 rounded-lg'>
                {[
                  { label: 'Your Name', value: userData?.name || 'N/A' },
                  { label: 'Email', value: userData?.email || 'N/A' },
                  { label: 'Phone Number', value: userData?.phone || 'N/A' },
                  { label: 'Kost Name', value: userData?.kostName || 'N/A' },
                ].map(item => renderEditableField(item))}
              </div>
              <div className='p-2 border-2 rounded-lg '>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-gray-900 font-medium text-lg">
                      About <span className="text-[#2A9D8F]">Kos</span>
                    </h3>
                    <button className="text-sm bg-[#F5F5F5] text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      View
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {userData?.kostName ? `Kost Name: ${userData.kostName}` : 'No Kost Name'}
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {kostData.location ? `Location: ${kostData.location}` : 'No Kost Location'}
                  </div>
                </div>
              </div>
              
              <div className='p-2 border-2 rounded-lg '>
                <div className="pt-2">
                  <h3 className="text-gray-900 font-medium text-lg mb-4">Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kost Payment Status</span>
                      <span className={`px-4 py-1.5 rounded-lg text-sm ${getStatusColor(kostStatus.paymentStatus)}`}>
                        {kostStatus.paymentStatus}
                        {kostStatus.paymentStatus === 'DELAYED' && ` (${kostStatus.delayDays} days)`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kost Continuation</span>
                      <span className="text-teal-500 bg-teal-50 px-4 py-1.5 rounded-lg text-sm">
                        {kostStatus.continuousType} Month(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="mb-8">
              <h3 className="text-gray-900 font-medium text-lg mb-1">Total Expenses</h3>
              <p className="text-sm text-gray-600 mb-6">Rp 250.000,00 by January 2025</p>
              <div className="relative w-72 mx-auto">
                <img src={PieChart} alt="Expenses breakdown" className="w-48" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                    <span className="text-sm text-gray-600">Laundry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4169E1]"></div>
                    <span className="text-sm text-gray-600">Water</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                    <span className="text-sm text-gray-600">Cleaning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 font-medium text-lg mb-4">Kos Review</h3>
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src={KostImage} 
                  alt="Dreamsville House" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h4 className="text-white font-medium">{userData?.kostName || 'Dreamsville House'}</h4>
                  <p className="text-white/80 text-sm">{kostData.location || 'Jl. Sultan Iskandar Muda, Jakarta selatan'}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 font-medium text-lg mb-1">Ratings</h3>
              <div className="flex items-center justify-between bg-[#F5F5F5] p-4 rounded-xl">
                <div>
                  <p className="text-gray-900 font-medium">4 Stars</p>
                  <p className="text-sm text-gray-600">from 34 customers</p>
                </div>
                <div className="bg-[#FFD700] p-3 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 font-medium text-lg mb-1">Ratings</h3>
              <div className="flex items-center justify-between bg-[#F5F5F5] p-4 rounded-xl">
                <div>
                  <p className="text-gray-900 font-medium">{kostData.rating} Stars</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="bg-[#FFD700] p-3 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-white text-sm font-bold bg-red-500 w-full h-10 rounded-lg hover:bg-red-600 transition-colors mt-4"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}