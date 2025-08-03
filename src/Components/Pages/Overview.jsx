import { FaServer, FaPlug, FaChartLine, FaBell, FaHistory } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const Overview = () => {
  // Mock data - replace with real API calls
  const stats = [
    { title: "Total Devices", value: "42", icon: <FaServer className="text-indigo-500" />, trend: "up" },
    { title: "Active", value: "28", icon: <FaPlug className="text-green-500" />, trend: "stable" },
    { title: "Alerts", value: "3", icon: <FaBell className="text-yellow-500" />, trend: "down" },
    { title: "Uptime", value: "99.8%", icon: <FiRefreshCw className="text-blue-500" />, trend: "stable" }
  ];

  const recentActivity = [
    { id: 1, action: "Device added", user: "Admin", time: "2 mins ago" },
    { id: 2, action: "Connection lost", user: "System", time: "15 mins ago" },
    { id: 3, action: "Reboot initiated", user: "Admin", time: "1 hour ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 rounded-full bg-opacity-20 bg-indigo-100">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                stat.trend === "up" ? "bg-green-500" : 
                stat.trend === "down" ? "bg-red-500" : "bg-blue-500"
              }`}></span>
              <span className="text-gray-500">Last 24h</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Connection Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Connection Status</h3>
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart.js or ApexCharts would go here</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Recent Activity</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors">
            Reboot All
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
            Backup Config
          </button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;