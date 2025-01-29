import Image from 'next/image';
import React from 'react';
import logo1 from '../../../public/logo5.jpg';
import logo2 from '../../../public/l3.png';
import logo3 from '../../../public/l4.png';
import logo4 from '../../../public/l1.png';
import logo5 from '../../../public/l2.png';

function LogoSection() {
  return (
    <div className="mx-auto bg-white items-center mt-32 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 m mb-10">Our Trusted Partners</h1>

      {/* Mobile - Logos displayed in rows */}
      <div className="sm:hidden mt-10 flex flex-wrap justify-between">
        <div className="w-1/2 px-2 mb-6">
          <Image
            src={logo1}
            width={200}
            height={150}
            alt="Logo 1"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="w-1/2 px-2 mb-6">
          <Image
            src={logo2}
            width={200}
            height={150}
            alt="Logo 2"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="w-1/2 px-2 mb-6">
          <Image
            src={logo3}
            width={200}
            height={150}
            alt="Logo 3"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="w-1/2 px-2 mb-6">
          <Image
            src={logo4}
            width={200}
            height={150}
            alt="Logo 4"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="w-1/2 px-2 mb-6">
          <Image
            src={logo5}
            width={200}
            height={150}
            alt="Logo 5"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
      </div>

      {/* Desktop - Logos in a grid layout */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">
        <div className="flex justify-center items-center">
          <Image
            src={logo1}
            width={200}
            height={150}
            alt="Logo 1"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={logo2}
            width={200}
            height={150}
            alt="Logo 2"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={logo3}
            width={200}
            height={150}
            alt="Logo 3"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={logo4}
            width={200}
            height={150}
            alt="Logo 4"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
        <div className="flex justify-center mx-6 items-center">
          <Image
            src={logo5}
            width={200}
            height={150}
            alt="Logo 5"
            className="hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg "
          />
        </div>
      </div>

      <div className="border-b border-gray-400 mt-10"></div>
    </div>
  );
}

export default LogoSection;
