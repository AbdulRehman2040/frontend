'use client';

import React from 'react';
import SellerForm from '../components/forms/AddSellerForm';
import Responsivenav from '../components/navbar/responsivenav';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-300 ">
      {/* Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
        <Responsivenav />
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow p-4 bg-gray-300 mt-14">
        <div className="max-w-4xl mx-auto">
          <SellerForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
