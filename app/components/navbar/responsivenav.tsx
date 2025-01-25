"use client"
import React, { useState } from 'react'
import Nav from './nav'
import Mobilenav from './mobilenav'

const Responsivenav = () => {
  const [shownav,setshownav] = useState(false)

  const shownavHandler =()=>setshownav(true)
  const hidenavhandler =()=>setshownav(false)
  return (
    <div>
         <Nav openNav={shownavHandler}/>
         <Mobilenav shownav={shownav} closeNav={hidenavhandler}/>
    </div>
  )
}

export default Responsivenav