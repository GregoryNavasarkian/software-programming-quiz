import React from 'react';
import UpdateEmployerForm from '../components/UpdateEmployerForm';

function UpdateEmployer() {
  return (
    <div className='w-full h-full py-16 px-4 shadow-lg bg-slate-200 mt-16'>
      <div className='w-full flex items-center justify-center'>
        <UpdateEmployerForm />
      </div>
    </div>
  )
}

export default UpdateEmployer;
