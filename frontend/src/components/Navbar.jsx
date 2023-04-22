import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import logo from '../assets/logo-no-background.png';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';

function Navbar() {
  let [open, setOpen] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);

  let links = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Log In', link: '/login' },
  ];

  let loggedInLinks = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Log Out', link: '/' },
  ];

  const reload = () => {
    window.location.reload();
  }
  
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-slate-900 py-4 md:px-14 px-7'>
        <div className='flex items-center font-bold text-2xl cursor-pointer font-[Roboto] flex-shrink-0'>
          <Link to='/'><img className='md:h-14 h-12 object-cover' src={logo} alt='logo' /></Link>
        </div>

        <div className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'
          onClick={() => setOpen(!open)}
        >
          <img src={open ? close : menu} alt='menu' className='w-6 h-6' />
        </div>

        <ul className={`md:flex flex-shrink-0 md:items-center md:pb-0 pb-12 absolute md:static md:bg-slate-900 bg-slate-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 ${open ? 'top-20 opacity-100 transition-all duration-300 ease-in' : 'top-[-490px] transition-all duration-300 ease-in'}`}>
          {loggedIn ?
            loggedInLinks.map((link) => (
              <li key={link.name} className='text-xl md:my-0 my-4'>
                <Link
                  to={link.link}
                  className='block py-2 px-4 text-slate-50 hover:bg-slate-800 rounded transition duration-300 ease-in-out'
                >
                  {link.name === 'Log Out'
                    ?
                    <button className='block text-slate-50 hover:bg-slate-800 rounded transition duration-300 ease-in-out'
                      onClick={() => {
                        localStorage.removeItem('authToken');
                        setLoggedIn(false);
                        reload();
                      }}>
                      {link.name}
                    </button>
                    :
                    link.name
                  }
                </Link>
              </li>
            ))
            :
            links.map((link) => (
              <li key={link.name} className='text-xl md:my-0 my-4'>
                <Link
                  to={link.link}
                  className='block py-2 px-4 text-slate-50 hover:bg-slate-800 rounded transition duration-300 ease-in-out'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          <div className='w-[15px]'></div>
          {loggedIn ?
            <Link to='/dashboard'>
              <NavButton>Dashboard</NavButton>
            </Link>
            :
            <Link to='/get-started'>
              <NavButton>Get Started</NavButton>
            </Link>
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar;