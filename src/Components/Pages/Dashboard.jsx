import { useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Overview from './Overview';
import DeviceManagement from './DeviceManagement';
import Profile from './Profile';
import Help from './Help';

const Dashboard = ({ onNavigate }) => {
  const [activeView, setActiveView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'devices':
        return <DeviceManagement />;
      case 'profile':
        return <Profile />;
      case 'help':
        return <Help />;
      case 'overview':
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeView={activeView}
          setActiveView={setActiveView}
          onNavigate={onNavigate}
        />
        
        <main className="flex-1 p-4 md:p-6 lg:ml-64">
          {renderActiveView()}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;