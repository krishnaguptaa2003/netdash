import { FaQuestionCircle, FaEnvelope, FaBook, FaVideo, FaDiscord } from 'react-icons/fa';
import { useState } from 'react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const faqs = [
    {
      id: 1,
      question: "How do I add a new device?",
      answer: "Go to Device Management > Click 'Add Device' > Fill in the details > Submit."
    },
    {
      id: 2,
      question: "Why is my device showing as offline?",
      answer: "Check the device's network connection. If the issue persists, try rebooting the device."
    },
    {
      id: 3,
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. You'll receive an email with reset instructions."
    }
  ];

  const guides = [
    {
      title: "Getting Started with Scrpcy",
      steps: [
        "1. Create your account",
        "2. Verify your email",
        "3. Add your first device",
        "4. Configure monitoring settings"
      ]
    },
    {
      title: "Advanced Device Configuration",
      steps: [
        "1. Navigate to Device Management",
        "2. Select your device",
        "3. Click 'Advanced Settings'",
        "4. Configure as needed"
      ]
    }
  ];

  return (
    <div className="mx-auto xl:max-w-[calc(100%-200px)] py-4 md:py-6">
      {/* Page Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <FaQuestionCircle className="text-indigo-600 text-2xl md:text-3xl" />
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Help Center</h1>
          <p className="text-gray-600 text-sm md:text-base">Find answers to common questions and get support</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('faq')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'guides'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Guides
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contact Support
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'faq' && (
        <div className="space-y-3 md:space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex justify-between items-center p-3 md:p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-sm md:text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedItems.includes(faq.id) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedItems.includes(faq.id) && (
                <div className="p-3 md:p-4 pt-0 border-t border-gray-200 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-lg mb-3">{guide.title}</h3>
              <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-indigo-500">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-lg mb-4 md:mb-6">Contact Our Support Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 md:p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-medium text-sm md:text-base">Email Us</h4>
                  <p className="text-gray-600 text-xs md:text-sm">support@scrpcy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaDiscord />
                </div>
                <div>
                  <h4 className="font-medium text-sm md:text-base">Join Our Discord</h4>
                  <p className="text-gray-600 text-xs md:text-sm">discord.gg/scrpcy</p>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="4" className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"></textarea>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm md:text-base">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;