import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import { House, Users, HeartHandshake, Phone } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-35">
          {/* Logo */}
          <div className="flex-shrink-0 transform transition-transform hover:scale-105">
            <Image src="/logo.jpeg" alt="logo" width={120} height={60} />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:ml-6 space-x-8 items-center justify-center">
            <a
              href="#home"
              className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-md cursor-pointer transition-colors flex items-center text-base font-medium"
            >
              <House className="mr-2 w-5 h-5" />
              Home
            </a>
            <a
              href="#aboutus"
              className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-md cursor-pointer transition-colors flex items-center text-base font-medium"
            >
              <Users className="mr-2 w-5 h-5" />
              About Us
            </a>
            <a
              href="#services"
              className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-md cursor-pointer transition-colors flex items-center text-base font-medium"
            >
              <HeartHandshake className="mr-2 w-5 h-5" />
              Services
            </a>
            <a
              href="#contactus"
              className="text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-4 py-3 rounded-md cursor-pointer transition-colors flex items-center text-base font-medium"
            >
              <Phone className="mr-2 w-5 h-5" />
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/volunteer"
              className="text-black px-4 py-2 rounded-md cursor-pointer transition-colors"
            >
              Volunteer Signup
            </a>
            <SignedIn>
              <a
                href="/map"
                className="text-black px-4 py-2 rounded-md cursor-pointer transition-colors"
              >
                Map
              </a>
            </SignedIn>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
