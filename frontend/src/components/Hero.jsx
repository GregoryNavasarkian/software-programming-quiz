import React from 'react';
import Typed from 'react-typed';
import NavButton from './NavButton';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='text-slate-50 hero bg-slate-800'>
      <div className="max-w-[800px] mt-[-96] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className='text-slate-400 font-bold md:text-2xl text-xl'>
          SOFTWARE PROGRAMMING QUIZ
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-slate-100 text-4xl font-bold md:py-6 py-2">
          Test your knowledge.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='text-slate-200 md:text-5xl sm:text-4xl text-xl font-bold'>
            Find qualified&nbsp;
          </p>
          <Typed className='md:text-5xl sm:text-4xl text-xl font-bold text-slate-200'
            strings={[
              ' candidates.',
              ' developers.',
              ' employees.',
            ]}
            typeSpeed={110}
            backSpeed={130}
            loop
          />
        </div>
        <p className='md:text-2xl px-6 text-xl font-bold text-slate-300 pt-6'>
          Take the quiz and find out how much you know.
        </p>
        <div className='p-8'>
          <Link to='/register'>
            <NavButton><span className='text-2xl font-bold'>Get Started</span></NavButton>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Hero;