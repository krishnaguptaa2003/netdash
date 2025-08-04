import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[calc(100%-200px)] py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              NetworkDash
            </h3>
            <p className="text-sm text-indigo-100">
              Comprehensive network monitoring and management solution for your infrastructure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Subscribe to our newsletter
            </h4>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-indigo-700/50 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm placeholder-indigo-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-indigo-700/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-indigo-200">
            &copy; {currentYear} NetworkDash. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-xs bg-indigo-700/50 px-2 py-1 rounded-full">
              v1.0.0
            </span>
            <span className="text-xs text-indigo-200">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;