import React from 'react';

import RegisterEmployerForm from '../components/RegisterEmployerForm';

function RegisterEmployer() {

  return (
    <div className='flex w-full h-screen bg-slate-800'>
      <div className='w-full flex items-center justify-center'>
        <RegisterEmployerForm />
      </div>
    </div>
  )
}

export default RegisterEmployer;
