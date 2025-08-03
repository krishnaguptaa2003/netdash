import React, { useState } from 'react';
import { FaServer, FaPlus, FaTrash, FaSync, FaPowerOff, FaCheckCircle, FaExclamationTriangle, FaPlug, FaNetworkWired } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const DeviceManagement = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        plant: 'Wcl',
        department: 'Central Office (104)',
        ipAddress: '192.168.1.1'
    });
    
    // State for device list
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showRebootModal, setShowRebootModal] = useState(false);
    const [deviceToReboot, setDeviceToReboot] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter devices based on search term
    const filteredDevices = devices.filter(device =>
        device.plant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.ipAddress.includes(searchTerm)
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Add new device
    const handleAddDevice = (e) => {
        e.preventDefault();
        const newDevice = {
            ...formData,
            id: Date.now(),
            connected: false,
            lastSeen: new Date().toISOString()
        };
        setDevices([...devices, newDevice]);
        setFormData({
            plant: 'Wcl',
            department: 'Central Office (104)',
            ipAddress: '192.168.1.1'
        });
    };

    // Toggle device connection
    const toggleConnection = (id) => {
        setDevices(devices.map(device =>
            device.id === id 
                ? { 
                    ...device, 
                    connected: !device.connected,
                    lastSeen: new Date().toISOString()
                  } 
                : device
        ));
    };

    // Remove device
    const removeDevice = (id) => {
        setDevices(devices.filter(device => device.id !== id));
    };

    // Initiate reboot process
    const initiateReboot = (id) => {
        setDeviceToReboot(id);
        setShowRebootModal(true);
    };

    // Confirm reboot
    const confirmReboot = () => {
        setIsLoading(true);
        // Simulate reboot process
        setTimeout(() => {
            setDevices(devices.map(device =>
                device.id === deviceToReboot
                    ? { ...device, connected: false }
                    : device
            ));
            setIsLoading(false);
            setShowRebootModal(false);
        }, 1500);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FaNetworkWired className="text-indigo-600 text-2xl" />
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Network Device Manager</h1>
                    </div>
                    <p className="text-gray-600">Monitor and manage your network infrastructure</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Devices</p>
                                <p className="text-2xl font-semibold text-gray-800">{devices.length}</p>
                            </div>
                            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                                <FaServer className="text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Connected</p>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {devices.filter(d => d.connected).length}
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-green-50 text-green-600">
                                <FaPlug className="text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Plants</p>
                                <p className="text-2xl font-semibold text-gray-800">
                                    {new Set(devices.map(d => d.plant)).size}
                                </p>
                            </div>
                            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                                <FiRefreshCw className="text-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Device Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Device</h2>
                    <form onSubmit={handleAddDevice}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plant</label>
                                <select
                                    name="plant"
                                    value={formData.plant}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="Wcl">Wcl</option>
                                    <option value="WLL">WLL</option>
                                    <option value="WCGPL">WCGPL</option>
                                    <option value="WML">WML</option>
                                    <option value="WDI">WDI</option>
                                    <option value="WSL-ATSPL">WSL-ATSPL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option>Central Office (104)</option>
                                    <option>Ayodhya</option>
                                    <option>Branch Office A</option>
                                    <option>Branch Office B</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                                <input
                                    type="text"
                                    name="ipAddress"
                                    value={formData.ipAddress}
                                    onChange={handleInputChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="192.168.1.1"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                <FaPlus className="mr-2" />
                                Add Device
                            </button>
                        </div>
                    </form>
                </div>

                {/* Device List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Managed Devices</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search devices..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
                            />
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Plant
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        IP Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDevices.length > 0 ? (
                                    filteredDevices.map((device) => (
                                        <tr key={device.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {device.plant}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {device.department}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {device.ipAddress}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${device.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {device.connected ? 'Connected' : 'Disconnected'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => toggleConnection(device.id)}
                                                        className={`p-1.5 rounded-md ${device.connected ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                                        title={device.connected ? 'Disconnect' : 'Connect'}
                                                    >
                                                        {device.connected ? <FaPowerOff /> : <FaPlug />}
                                                    </button>
                                                    <button
                                                        onClick={() => initiateReboot(device.id)}
                                                        className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md"
                                                        title="Reboot"
                                                    >
                                                        <FaSync />
                                                    </button>
                                                    <button
                                                        onClick={() => removeDevice(device.id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                                                        title="Remove"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            {devices.length === 0 ? 'No devices added yet' : 'No devices match your search'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Reboot Confirmation Modal */}
            {showRebootModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex flex-col items-center">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                <FaExclamationTriangle className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Reboot Device?
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to reboot the device at {deviceToReboot && devices.find(d => d.id === deviceToReboot)?.ipAddress}?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setShowRebootModal(false)}
                                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmReboot}
                                disabled={isLoading}
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                {isLoading ? 'Rebooting...' : 'Confirm Reboot'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceManagement;