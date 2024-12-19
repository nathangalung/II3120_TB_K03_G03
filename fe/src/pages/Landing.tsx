import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import LandingImage from '../assets/images/Landing.png';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const API_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
        navigate('/home');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Server error: Unable to connect to authentication service');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      kostName: (form.elements.namedItem('kost-name') as HTMLInputElement).value,
      email: (form.elements.namedItem('signup-email') as HTMLInputElement).value,
      password: (form.elements.namedItem('signup-password') as HTMLInputElement).value,
    };
  
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setIsLogin(true);
        setError('Registration successful! Please sign in.');
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Server error: Unable to connect to registration service');
      console.error('Registration error:', err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-0">
        <div className="w-full max-w-[400px]">
        {error && showError && (
          <div className={`p-4 mb-4 rounded-md text-left ${
            error.includes('successful') 
              ? 'bg-green-50 text-green-600' 
              : 'bg-red-50 text-red-600'
          }`}>
            {error}
          </div>
        )}
          
          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold mb-2 text-left">Welcome back!</h1>
              <p className="text-gray-600 mb-6 text-left">
                Enter your Credentials to access your account
              </p>

              <form className="space-y-4" onSubmit={handleSignIn}>
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

                <div className="text-right">
                  <Link to="#" className="text-sm text-orange-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>

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
              <h1 className="text-3xl font-bold mb-2 text-left">Get Started Now</h1>

              <form className="space-y-4" onSubmit={handleSignUp}>
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 text-left">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="kost-name" className="block text-sm font-medium mb-1 text-left">
                    Kost Name
                  </label>
                  <input
                    id="kost-name"
                    type="text"
                    placeholder="Enter your Kost name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>

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

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-md transition"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
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

      <div className="hidden md:block md:w-1/2 h-full absolute top-0 right-0">
        <img
          src={LandingImage}
          alt="Modern house with pool"
          className="w-full h-full object-cover rounded-l-3xl"
        />
      </div>
    </main>
  );
}