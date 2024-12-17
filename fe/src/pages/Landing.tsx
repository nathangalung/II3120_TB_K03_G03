import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingImage from '../assets/images/Landing.png';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-[400px]">
          {isLogin ? (
            <>
              {/* Sign In Header */}
              <h1 className="text-3xl font-bold mb-2 text-left">Welcome back!</h1>
              <p className="text-gray-600 mb-6 text-left">
                Enter your Credentials to access your account
              </p>

              {/* Sign In Form */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/home'); // Redirect to HomePage
                }}
              >
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-left">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-left">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link to="#" className="text-sm text-orange-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember for 30 days
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-md transition"
                >
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Sign Up Header */}
              <h1 className="text-3xl font-bold mb-2 text-left">Get Started Now</h1>

              {/* Sign Up Form */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate('/home'); // Redirect to HomePage
                }}
              >
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-left">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-1 text-left">
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-1 text-left">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="#" className="text-teal-500 hover:underline">
                      terms & policy
                    </Link>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-md transition"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}

          {/* Toggle Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-orange-500 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-orange-500 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Right Side - Full Image */}
      <div className="hidden lg:block lg:w-1/2 h-full absolute top-0 right-0">
        <img
          src={LandingImage}
          alt="Modern house with pool"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </main>
  );
}
