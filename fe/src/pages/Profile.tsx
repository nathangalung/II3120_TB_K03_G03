// fe/src/pages/Profile.tsx
import Header from '../components/Header';
import KostImage from '../assets/images/Kost.png';
import ProfileImage2 from '../assets/images/UserProfile2.png';
import PieChart from '../assets/images/Pie.png';
import { useUser } from '../contexts/User';

export default function ProfilePage() {
  const { userData } = useUser();

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
              {[
                { label: 'Your Name', value: userData?.name || 'N/A' },
                { label: 'Email', value: userData?.email || 'N/A' },
                { label: 'Phone Number', value: userData?.phone || 'N/A' },
                { label: 'Kost Name', value: userData?.kostName || 'N/A' },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-gray-600 text-sm">{item.label}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900">{item.value}</p>
                    <button className="text-sm bg-[#F5F5F5] text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-900 font-medium text-lg">
                    About <span className="text-[#2A9D8F]">Kos</span>
                  </h3>
                  <button className="text-sm bg-[#F5F5F5] text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    View
                  </button>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {userData?.kostName ? `Kost Name: ${userData.kostName}` : 'No Kost Name'}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {userData?.kostLocation ? `Location: ${userData.kostLocation}` : 'No Kost Location'}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-gray-900 font-medium text-lg mb-4">Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="text-red-500 bg-red-50 px-4 py-1.5 rounded-lg text-sm">
                      Unpaid
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Continuation Status</span>
                    <span className="text-emerald-500 bg-emerald-50 px-4 py-1.5 rounded-lg text-sm">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="mb-8">
              <h3 className="text-gray-900 font-medium text-lg mb-1">Total Expenses</h3>
              <p className="text-sm text-gray-600 mb-6">Rp 250.000,00 by January 2025</p>
              <div className="relative w-48 mx-auto">
                <img src={PieChart} alt="Expenses breakdown" className="w-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                    <span className="text-sm text-gray-600">Laundry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4169E1]"></div>
                    <span className="text-sm text-gray-600">Water</span>
                  </div>
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
                  <p className="text-white/80 text-sm">{userData?.kostLocation || 'Jl. Sultan Iskandar Muda, Jakarta selatan'}</p>
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

            <div>
              <h3 className="text-gray-900 font-medium text-lg mb-4">Customer Reviews</h3>
              <div className="bg-[#F5F5F5] p-4 rounded-xl mb-4">
                <p className="font-medium text-gray-900 mb-2">Ankit Srivastava</p>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-600">excellent service.</p>
              </div>
              <button className="text-red-500 text-sm hover:underline">
                See all reviews →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}