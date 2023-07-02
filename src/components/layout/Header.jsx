import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { changeStatus } from '../../store/slices/cart.slice'

const Header = () => {

  const dispatch = useDispatch()

  const showCart = () => dispatch(changeStatus())

  return (
    <header className='flex justify-between p-2 py-4 items-center text-xl text-gray-800 sm:text-3xl lg:text-4xl'>

      <Link to="/"><label className='font-["Quicksand"]' >E - <strong>C O M M E R C E</strong></label></Link>

      <nav className='flex justify-between w-[30%] lg:pr-8 lg:w-[30%]lg:text-5xl'>
        <button onClick={showCart}><i className='bx bx-cart hover:text-black/50 transition-all duration-300'></i></button>        
        <Link to='/purchases'><i className='bx bx-box hover:text-black/50 transition-all duration-300'></i></Link>
        <Link to='/login'><i className='bx bx-user hover:text-black/50 transition-all duration-300'></i></Link>
      </nav>

    </header>
  )
}

export default Header