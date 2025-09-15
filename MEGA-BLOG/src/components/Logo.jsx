import React from 'react'
import logo from '../assets/ink_logo.png'
function Logo({width='100px'}) {
  return (
    <img src={logo} alt="" className='h-[30px] w-[150px] rounded-2xl'/>
  )
}

export default Logo