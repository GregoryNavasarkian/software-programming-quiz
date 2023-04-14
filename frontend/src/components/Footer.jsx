import React from 'react';
import logo from '../assets/logo-no-background.png';

function Footer() {
  return (
    <div className='bg-slate-900'>
      <div className='max-w-[1240px] mx-auto py-16 px-8 grid lg:grid-cols-4 gap-6 text-slate-100'>
        <a href='/'><img className='md:h-14 h-12 object-cover' src={logo} alt='logo' /></a>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Company</p>
          <span className='py-2'><a href='/about'>About</a></span>
          <span className='py-2'><a href='/contact'>Contact</a></span>
        </div>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Account</p>
          <span className='py-2'><a href='/login'>Sign In</a></span>
          <span className='py-2'><a href='/register'>Sign Up</a></span>
        </div>
        <div className='flex flex-col justify-center pl-4'>
          <p className='text-xl font-bold'>Legal</p>
          <span className='py-2'><a href='/privacy'>Privacy Policy</a></span>
          <span className='py-2'><a href='/terms'>Terms of Use</a></span>
        </div>
      </div>
    </div>
  )
}

export default Footer;