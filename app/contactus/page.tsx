import React, { useEffect, useState } from 'react';

const EmergencySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-white">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl px-4 py-8">
        {/* Content Box on the Left */}
        <div className={`relative z-10 w-full max-w-md p-8 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500 bg-white mb-8 md:mb-0 md:mr-10 flex flex-col items-center text-center ${isVisible ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">24/7 Emergency Ambulance Care with RescueRush</h2>
          <p className="text-blue-500 text-xl mb-4">For Emergency Medical Service</p>
          <p className="text-gray-600 mb-8">
          Rescues the Patient in case of the Emergency situation by doing just a click.  Ambulance comes right in front of the door for help.
          </p>
          <div className="flex flex-col items-center w-full">
            <button className="bg-pink-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-600 transition-colors duration-300 transform hover:scale-105 mb-4">
              CALL 108
            </button>
            <p className="text-gray-800 mb-2">or</p>
            <button className="border border-pink-500 text-pink-500 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-pink-50 transition-colors duration-300 transform hover:scale-105">
              <span className="inline-flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l6 6m0 0l6-6m-6 6V4"></path>
                </svg>
                +91 9686079760
              </span>
            </button>
          </div>
        </div>

        {/* GIF Section on the Right */}
        <div className="relative w-full max-w-md">
          <img 
            src="./ambu1.gif" 
            alt="Emergency Services" 
            className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-105" 
            style={{ height: '400px' }} 
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default EmergencySection;