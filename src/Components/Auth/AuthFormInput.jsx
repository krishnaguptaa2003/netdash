import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthFormInput = ({
  id,
  label,
  type = 'text',
  icon,
  showToggle = false,
  onToggle,
  ...props
}) => (
  <div className="space-y-2 w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        id={id}
        type={type}
        className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base`}
        {...props}
      />
      {showToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onToggle}
          aria-label={type === 'password' ? 'Show password' : 'Hide password'}
        >
          {type === 'password' ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  </div>
);

export default AuthFormInput;