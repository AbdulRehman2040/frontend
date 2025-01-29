'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="bg-white text-black pt-16 pb-12">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1px] border-gray-600">

        {/* 1st Column: Logo and Contact Info */}
        <div className="flex flex-col items-start space-y-6">
          <Image
            src={require('../../../public/Logo-PNG.png')}
            alt="Logo"
            height={120}
            width={120}
            className="mb-4 mx-auto sm:mx-0"
          />
          <p className="text-lg  max-w-[250px] ">
            Let us connect you with the perfect tenants, making your property journey effortless and rewarding!
          </p>

          {/* Contact info */}
          {/* <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <MdEmail className="w-5 h-5" />
              <p className="text-sm">Email: info@lbre.co.uk</p>
            </div>
            <div className="flex items-center space-x-2">
              <MdPhone className="w-5 h-5" />
              <p className="text-sm">Phone: 0800 788 0542</p>
            </div>
          </div> */}
        </div>

        {/* 2nd Column: Contact Us */}
        <div className="flex flex-col space-y-4 mt-8 sm:mt-0">
          <h1 className="text-xl font-semibold">Contact Us</h1>
          <p>Head Office</p>
          <p>Capital Office</p>
          <p>124 City Road London</p>
          <p>EC1V 2NX</p>
          <p className="">Email: info@lbre.co.uk</p>
        </div>

        {/* 3rd Column: Let's Talk */}
        <div className="flex flex-col space-y-4 mt-8 sm:mt-0">
          <h1 className="text-xl font-semibold">Let's Talk</h1>
          <p>Call Centre</p>
          <p>Level One, Basecamp Liverpool</p>
          <p>49 Jamaica Street Liverpool</p>
          <p>L1 0AH</p>
          <p className="">Phone: 0800 788 0542</p>
        </div>

        {/* 4th Column: Newsletter Subscription */}
        <div className="flex flex-col space-y-4 mt-8 sm:mt-0">
          <h1 className="text-xl font-semibold">Subscribe to Our Newsletter</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg outline-none bg-gray-200 text-black w-full"
          />
          <button className="px-4 py-3 mt-4 rounded-lg outline-none bg-rose-600 w-full text-white hover:bg-rose-700 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Text & Social Icons */}
      <div className="text-center mt-8 text-sm text-gray-600">
        {/* <p>© Copyright 2024 by webdev <span className="font-bold text-black">Abdul</span></p> */}

        {/* Social Icons */}
        <div className="flex justify-center items-center mt-4 space-x-6">
          <Link href={'https://www.facebook.com/p/LetmyProperty-100063533561969/'}   
          target='blank'
          className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
          <FaFacebookF className="w-6 h-6 text-[#3b5999] hover:text-[#2d4373] transition duration-300  text-2xl" />
          </Link>
          <Link href={'https://uk.linkedin.com/company/l-b-realestate'}
          target='blank'
          className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
          <FaLinkedinIn className="w-6 h-6 text-[#0077b5] hover:text-[#005c8e] transition duration-300 text-2xl" />
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
