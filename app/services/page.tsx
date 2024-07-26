'use client';
import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-200 to-white min-h-screen py-12 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          We offer a range of services to ensure efficient and effective emergency response.
        </p>
      </div>
      <div className="flex justify-center mb-8">
        {/* <button  className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-lg transition-colors duration-300 transform hover:scale-105">
          Contact Us
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {servicesData.map((service, index) => (
          <div key={index} className={`bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl hover:bg-blue-50 animate-slide-in`}>
            <div className="mb-6">
              <div className="bg-green-300 p-4 rounded-full inline-block icon-container">
                <img src={service.icon} alt={service.title} className="h-16 w-16 icon-animation"/>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slide-in {
         @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        @keyframes icon-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .icon-container {
          transition: transform 0.3s ease;
        }

        .icon-container:hover {
          animation: icon-bounce 0.6s ease infinite;
        }
      `}</style>
    </section>
  );
}

const servicesData = [
  {
    title: "Real Time Location Tracker",
    description: "This fetches the locations of the accident spot, volunteers, and ambulances. This comprehensive tracking system ensures that the nearest available resources can be quickly dispatched, optimizing response times and improving emergency response efficiency.",
    icon: "service1.png",
  },
  {
    title: "Volunteer Verification",
    description: "Ensures all volunteers are properly vetted and verified for safety and reliability. Our thorough screening process includes background checks, certification verification, and ongoing training to maintain high standards.",
    icon: "service2.png",
  },
  {
    title: "Optimal Path",
    description: "Calculates the best routes for ambulances and volunteers to reach the scene quickly. Utilizing advanced algorithms and real-time traffic data, we ensure that help arrives in the shortest possible time.",
    icon: "service3.png",
  },
];

export default ServicesSection;
