import React from 'react'
import { useState } from 'react'
import NavButton from './NavButton'
import logo from '../assets/logo-no-background.png'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'

function Navbar() {
  let [open, setOpen] = useState(false);

  let links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Sign In', link: '/login' },
  ];

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-slate-900 py-4 md:px-10 px-7'>
        <div className='flex items-center font-bold text-2xl cursor-pointer font-[Roboto]'>
          <a href='/'><img src={logo} alt='logo' className='h-14' /></a>
        </div>
        
        <div className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'
          onClick={() => setOpen(!open)}
        >
          <img src={open ? close : menu} alt='menu' className='w-6 h-6' />
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:bg-slate-900 bg-slate-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px]'}`}>
          {links.map((link) => (
            <li key={link.name} className='md:ml-4 text-xl md:my-0 my-4'>
              <a
                href={link.link}
                className='block py-2 px-4 text-white hover:bg-slate-800 rounded transition duration-300 ease-in-out'
              >
                {link.name}
              </a>
            </li>
          ))}
          <a href='/login'>
            <NavButton>
              Get Started
            </NavButton>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar