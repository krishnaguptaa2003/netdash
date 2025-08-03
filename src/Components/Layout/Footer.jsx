const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-4 border-t border-indigo-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Scrpcy. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-indigo-200">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-indigo-200">Terms of Service</a>
            <a href="#" className="text-sm hover:text-indigo-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;