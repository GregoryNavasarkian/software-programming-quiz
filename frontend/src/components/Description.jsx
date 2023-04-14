import React from 'react';
import MultipleChoice from '../assets/multiple_choice.png';

function Description() {
  return (
    <div className='w-full py-16 px-4 shadow-lg bg-slate-200'>
      <div className='max-w-[1250px] mx-auto grid md:grid-cols-2'>
        <img src={MultipleChoice} alt='Multiple Choice' className='w-[350px] mx-auto my-4' />
        <div className='flex flex-col justify-center md:items-start items-center'>
          <p className='md:text-xl text-lg font-bold text-slate-600 pt-2'>SOFTWARE PROGRAMMING QUIZ</p>
          <h1 className='text-slate-800 md:text-4xl text-2xl font-bold md:py-2 py-1'>Test Your Knowledge</h1>
          <p className='text-slate-950 md:text-xl text-lg md:text-left text-center md:px-1 md:w-[450px] w-full px-4'>Determine if potential employees have the necessary programming skills to succeed in your company. Create an account or login to create a quiz.</p>
        </div>
      </div>
    </div>
  )
}

export default Description;