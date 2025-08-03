import { useState } from 'react';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Dashboard from './Components/Pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('login');

  const navigate = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <Login onNavigate={navigate} />;
      case 'signup':
        return <Signup onNavigate={navigate} />;
      case 'forgot-password':
        return <ForgotPassword onNavigate={navigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      default:
        return <Login onNavigate={navigate} />;
    }
  };

  const backgroundClass = currentView !== 'dashboard' 
    ? "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
    : "";

  return (
    <div className={backgroundClass}>
      {renderContent()}
    </div>
  );
}

export default App;