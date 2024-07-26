'use client';

import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ServicesSection from '@/app/services/page';
import Contact from '@/app/contactus/page';
import Footer from '@/app/footer';

const Home: React.FC = () => {
  const router = useRouter();

  const [message, setMessage] = useState('');
  const [userLocation, setUserLocation] = useState(null); 

  useEffect(() => {
    const text = 'ON TIME\nEVERY TIME\nSAVING LIVES';
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setMessage(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    console.log("Clicked me!");
    router.push('/map');
  }



  return (
    <div>
      <NavBar />

      <section id="home" className="relative bg-cover bg-center h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('home.jpg')", filter: "blur(2px)", zIndex: -2 }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" style={{ zIndex: -1 }}></div>
        <div className="relative text-white text-center px-8 md:px-16 animate__animated animate__fadeInUp">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 whitespace-pre-line animate__animated animate__zoomIn">
            {message}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-shadow-md animate__animated animate__fadeIn animate__delay-1s">
            Providing immediate, compassionate assistance to those in need.
          </p>
          <a
            href="#services"
            className="bg-gray-100 hover:bg-gray-300 text-[#2c3e50] font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 animate__animated animate__pulse animate__infinite animate__delay-2s"
          >
            <span className="mr-2">Explore Services</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>

      <section id="aboutus" className="bg-gradient-to-r from-blue-200 to-white items-center justify-center overflow-hidden">
  <div className="about-section" id="about">
    <div className="about-image-content">
      <img src='./doctor-group.png' alt="Doctor Group" className="about-image1" />
    </div>

    <div className="about-text-content">
      <h3 className="about-title">
        <span>About Us</span>
      </h3>
      <p className="about-description">
        A volunteer-integrated ambulance service website aims to revolutionize emergency response by harnessing the power of community volunteers alongside professional emergency services.
      </p>
      <ul className="list-tick">
        <li className="list-item">Revolutionizing emergency response by integrating community volunteers with professional services.</li>
        <li className="list-item">Facilitating connections between individuals in need of emergency medical help and available ambulances and volunteers.</li>
        <li className="list-item">Empowering volunteers to assist healthcare professionals and expedite emergency response efforts.</li>
        <li className="list-item">Promoting community engagement and collaboration in emergency preparedness through innovative technology.</li>
      </ul>
    </div>
  </div>
</section>


      <section id="services" className=" overflow-hidden">
        <div>
          
         <ServicesSection/> 
        </div>
      </section>

      <section id="contactus" className=" overflow-hidden">
        <Contact/>
      </section>
      
      <Footer/>
    </div>
     
    );
   
}

export default Home;
