"use client"
import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='pt-20 pb-12 bg-white'>
        <div className='w-[80%] grid mx-auto items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white border-opacity-20'>
   {/* 1st */}
     <div>
        <Image src={require('../../../public/Logo-PNG.png')} alt='images' height={100} width={100} />
        <p className='text-black  mt-3'>Nationwide Commercial Specialists</p>
        {/* socail io */}
        <div className='flex items-center space-x-4 mt-6'>
            <FaFacebookF className='w-6 h-6 text-[#3b5999] '/>
            <FaLinkedinIn className='w-6 h-6 text-[#0077b5] '/>
            <FaTwitter className='w-6 h-6 text-[#006db5]'/>
            <FaInstagram className='w-6 h-6 text-[#e4405f]'/>
        </div>
     </div>
      {/* 2nd */}
      <div>
        <h1 className='footer__heading text-black'>Contact us</h1>
        <p className='footer__link font-bold   text-black '>Head Office</p>
        <p className='footer__link text-black'>Capital Office</p>
        <p className='footer__link text-black'>124 City Road London</p>
        <p className='footer__link text-black'>EC1V 2NX</p>
       
      </div>
      {/* 3rd */}
      <div>
      <h1 className='footer__heading text-black'>Lets Talk</h1>
        <p className='footer__link font-bold  text-black '>Call Centre</p>
        <p className='footer__link text-black'>Level One, Basecamp Liverpool</p>
        <p className='footer__link text-black'>49 Jamaica Street Liverpool</p>
        <p className='footer__link text-black'>L1 0AH</p>
        
      </div>
      {/* 4 */}
      <div>
        <h1 className='footer__heading'>Subscribe our Newsletter</h1>
        <input type="text" placeholder='Enter email to unsubscribe' className='px-3 py-2 rounded-lg outline-none bg-gray-600 w-full text-white'/>
        <button className='px-3 py-2 mt-4 rounded-lg outline-none bg-rose-600 w-full text-white'>UnSubscribe</button>
      </div>
        </div>
        <p className='text-center mt-4 text-white text-opacity-70 text-base'>©Copyright 2024 by webdev <span className='font-bold'>Abdul</span> </p>
    </div>
  )
}

export default Footer