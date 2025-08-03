import { useState } from 'react';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const VerifyEmail = ({ onNavigate }) => {
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    // Verify OTP logic here
    setIsVerified(true);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="px-6 py-6 sm:px-8 sm:py-6">
          {!isVerified ? (
            <>
              <button
                onClick={() => onNavigate('signup')}
                className="flex items-center text-indigo-600 hover:text-indigo-500 mb-4"
              >
                <FaArrowLeft className="mr-2" /> Back to Sign Up
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
                <p className="text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((digit) => (
                    <input
                      key={digit}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      value={otp[digit-1] || ''}
                      onChange={(e) => {
                        const newOtp = otp.split('');
                        newOtp[digit-1] = e.target.value;
                        setOtp(newOtp.join(''));
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={otp.length < 6}
                  className={`w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium ${
                    otp.length < 6 ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                  }`}
                >
                  Verify Email
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FaCheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-4">
                Your email has been successfully verified. You can now log in to your account.
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;