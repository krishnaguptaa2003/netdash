import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import AuthFormInput from './AuthFormInput';

const Signup = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onNavigate('dashboard');
  };

  return (
    <div className="w-full max-w-md transition-all duration-300">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        
        <div className="px-6 py-6 sm:px-8 sm:py-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
            <p className="text-gray-500 mt-1">Start your journey with Scrpcy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormInput
              id="name"
              label="Full Name"
              type="text"
              icon={<FaUser className="text-gray-400" />}
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <AuthFormInput
              id="email"
              label="Email"
              type="email"
              icon={<FaEnvelope className="text-gray-400" />}
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <AuthFormInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={<FaLock className="text-gray-400" />}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <AuthFormInput
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              icon={<FaLock className="text-gray-400" />}
              showToggle
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-600">
                I agree to the{' '}
                <button type="button" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !acceptedTerms}
              className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${(!acceptedTerms || isLoading) ? 'opacity-80' : ''}`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Create Account <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl sm:px-8">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;