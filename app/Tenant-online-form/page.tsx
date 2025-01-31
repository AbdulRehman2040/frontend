'use client';

import React from 'react';
import SellerForm from '../components/forms/AddSellerForm';
import Responsivenav from '../components/navbar/responsivenav';
import LogoSection from '../components/logo/logo';
import Footer from '../components/footer/footer';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white ">
      {/* Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
        <Responsivenav />
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow p-4 bg-white mt-[5rem]">
        <div className="max-w-4xl mx-auto">
          <SellerForm />
        </div>
      </div>
      <div className="border-b border-gray-400 mt-10"></div>
      <LogoSection/>
      <Footer/>
    </div>
  );
};

export default Page;
