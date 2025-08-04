import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Header = ({
  toggleSidebar,
  showSidebarToggle = true,
  user = null,
  notificationCount = 0,
}) => {
  return (
    <header className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[calc(100%-200px)]">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-indigo-200 focus:outline-none transition-colors"
                aria-label="Toggle sidebar"
                data-hamburger-menu
              >
                <FaBars className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              NetworkDash
            </h1>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              className="text-white hover:text-indigo-200 relative transition-colors"
              aria-label="Notifications"
            >
              <FaBell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600"></span>
              )}
            </button>

            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <FaUserCircle className="h-8 w-8 text-indigo-200 group-hover:text-white transition-colors" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-indigo-600"></span>
              </div>
              <span className="text-sm font-medium text-white group-hover:text-indigo-100 transition-colors hidden sm:inline">
                {user?.name || 'Guest'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  showSidebarToggle: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  notificationCount: PropTypes.number,
};

export default Header;