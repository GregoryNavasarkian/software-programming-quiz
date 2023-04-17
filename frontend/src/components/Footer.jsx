import React from 'react';
import logo from '../assets/logo-no-background.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='bg-slate-900'>
      <div className='max-w-[1240px] mx-auto py-16 px-8 grid lg:grid-cols-4 gap-6 text-slate-100'>
        <Link to='/'><img className='md:h-14 h-12 object-cover' src={logo} alt='logo' /></Link>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Company</p>
          <span className='py-2'><Link to='/about'>About</Link></span>
          <span className='py-2'><Link to='/contact'>Contact</Link></span>
        </div>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Account</p>
          <span className='py-2'><Link to='/login'>Sign In</Link></span>
          <span className='py-2'><Link to='/register'>Sign Up</Link></span>
        </div>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Legal</p>
          <span className='py-2'><Link to='/privacy'>Privacy Policy</Link></span>
          <span className='py-2'><Link to='/terms'>Terms of Use</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Footer;