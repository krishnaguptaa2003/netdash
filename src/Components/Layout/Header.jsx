import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => (
  <header className="bg-indigo-900 text-white shadow-md">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-white hover:text-indigo-200 focus:outline-none"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <img
              src="https://placehold.co/100x40/6366f1/ffffff?text=Scrpcy&font=sans"
              alt="Logo"
              className="h-10 object-contain"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-indigo-200">
            <FaBell className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <FaUserCircle className="h-8 w-8 text-indigo-200" />
            <span className="ml-2 text-sm font-medium text-white">Admin</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;