"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { navlinks } from '@/constant/constant'
import Link from 'next/link'
import { HiBars3BottomRight } from 'react-icons/hi2'
import logo from '../../../public/Logo-PNG.png'

// define nav props
type Props ={
  openNav:()=>void
}

const Nav = ({openNav}:Props) => {
const [navbg,setnavbg] = useState(false)
 useEffect(()=> {
  const handler = ()=>{
    if(window.scrollY>=99){
      setnavbg(true)
    }
    if(window.scrollY<99){
      setnavbg(false)
    }
  }
  window.addEventListener('scroll', handler)
  return ()=>window.removeEventListener('scroll', handler)

 })
  return (
    <div className={`fixed text-black bg-white  ${navbg?' ':'fixed'} w-full transition-all text-black  duration-200 h-[12vh]   z-[1000]`}>
      <div className='flex items-center h-full justify-between w-[90%] xl:w[80%] mx-auto'>
 {/* logo */}
     <Image src={logo} alt='logo' width={120} height={120}/>
     {/* nav links */}
     <div className='hidden lg:flex items-center space-x-10 text-black'>
      {navlinks.map((link)=>{
        return <Link key={link.id} href={link.url}>
           <p className='nav__link text-black'>{link.label}</p>
        </Link>
      })}
     </div>
     {/* button */}
     <div className='flex items-center space-x-4'>
      <Link href={'/contact'}>
      <button className='md:px-10 md:py-2 px-8 py-1.5 text-black font-bold text-lg bg-[#f0cd7c] hover:bg-white transition-all hover:border-2 border-black duration-200 rounded-lg'>
        Contact Us
      </button>
      </Link>
      {/* burder */}
      <HiBars3BottomRight onClick={openNav} className='w-8 h-8 cursor-pointer text-black lg:hidden '/>
     </div>
      </div>
      </div>
  )
}

export default Nav