// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} RescueRush. All rights reserved.</p>
        <p>
          <a href="#home" className="text-gray-400 hover:text-gray-300 mx-2">Home</a>
          <a href="#aboutus" className="text-gray-400 hover:text-gray-300 mx-2">About Us</a>
          <a href="#services" className="text-gray-400 hover:text-gray-300 mx-2">Services</a>
          <a href="#contactus" className="text-gray-400 hover:text-gray-300 mx-2">Contact</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
