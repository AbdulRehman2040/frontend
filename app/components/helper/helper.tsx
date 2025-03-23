"use client"
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const Scrolltotop = () => {
    const [isVisible,setIsvisible]=useState(false)

    useEffect(()=>{
      const togglevisble=()=>{
        if(window.scrollY>300){
            setIsvisible(true)
        }else{
            setIsvisible(false)
        }
      }
   
      window.addEventListener('scroll',togglevisble)


          return()=>{ 
            window.removeEventListener('scroll',togglevisble)
        }
    },[])

const scrollToTop =()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

  return (
    <div className='fixed bottom-4 animate-pulse right-4 '>
        {isVisible && 
        (<button onClick={scrollToTop} className='bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none '>
            <FaArrowUp/>
            </button>)}
    </div>
  )
}

export default Scrolltotop