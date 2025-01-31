"use client"
import React from 'react'
import BuyerForm from '../components/forms/AddBuyerForm'
import Responsivenav from '../components/navbar/responsivenav'
import LogoSection from '../components/logo/logo'
import Footer from '../components/footer/footer'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white'>
     <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
        <Responsivenav />
      </div>
       {/* Scrollable Content */}
            <div className="flex-grow p-4 bg-white mt-14">
              <div className="max-w-4xl mx-auto">
                <BuyerForm />
              </div>
            </div>
            <div className="border-b border-gray-400 mt-10"></div>
      <LogoSection/>
      <Footer/>
      </div>
  )
}

export default page