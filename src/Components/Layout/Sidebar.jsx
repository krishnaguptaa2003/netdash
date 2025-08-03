import { 
  FaHome, 
  FaServer, 
  FaUser, 
  FaQuestionCircle,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, activeView, setActiveView, onNavigate }) => {
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view and setup click outside handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const handleClickOutside = (event) => {
      if (isOpen && isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    // Initial check
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile, toggleSidebar]);

  const navItems = [
    { id: 'overview', icon: <FaHome />, label: 'Overview' },
    { id: 'devices', icon: <FaServer />, label: 'Devices' },
    { id: 'profile', icon: <FaUser />, label: 'Profile' },
    { id: 'help', icon: <FaQuestionCircle />, label: 'Help' }
  ];

  const handleNavigation = (id) => {
    setActiveView(id);
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay - Only shown on mobile when sidebar is open */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" />
      )}

      {/* Sidebar Container with ref for click detection */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header with Close Button */}
        <div className="p-4 border-b border-indigo-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Scrpcy</h2>
          <button 
            onClick={toggleSidebar}
            className="text-2xl hover:text-indigo-300 focus:outline-none lg:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg w-full transition-colors ${
                    activeView === item.id ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-700">
          <button
            onClick={() => {
              onNavigate('login');
              if (isMobile) toggleSidebar();
            }}
            className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-indigo-700 transition-colors"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;