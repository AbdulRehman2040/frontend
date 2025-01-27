"use client"
import React from 'react'
import BuyerForm from '../components/forms/AddBuyerForm'
import Responsivenav from '../components/navbar/responsivenav'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-300'>
     <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
        <Responsivenav />
      </div>
       {/* Scrollable Content */}
            <div className="flex-grow p-4 bg-gray-300 mt-14">
              <div className="max-w-4xl mx-auto">
                <BuyerForm />
              </div>
            </div>
      </div>
  )
}

export default page