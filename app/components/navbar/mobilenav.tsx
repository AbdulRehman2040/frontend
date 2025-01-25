import React from 'react'

import Nav from './nav'
import { navlinks } from '@/constant/constant'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'
// type props
type Props ={
  shownav:boolean,
  closeNav:()=>void
}


const Mobilenav = ({closeNav,shownav}:Props) => {
  const navOpen = shownav ? "translate-x-0":'translate-x-[-100%]'
  return (
    <div>
      {/* overlay */}
      <div className={`fixed ${navOpen} top-0 transform transition-all duration-500 z-[10000] left-0 right-0 bottom-0 bg-black opacity-70 w-full h-[100vh]`} />
      <div className={`text-white ${navOpen}  fixed  justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-indigo-900 space-y-6 z-[100006]`}>
           {/* navlinks */}
           {navlinks.map((link)=>{
        return <Link key={link.id} href={link.url}>
           <p className='nav__link text-[20px] ml-12 border-b-[1.5] pb-2 border-white sm:text-[30px] '>{link.label}</p>
        </Link>
      })}
    <CgClose onClick={closeNav} className='absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6'/>  
      </div>
    </div>
  )
}

export default Mobilenav