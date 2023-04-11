import React from 'react'

const NavButton = (props) => {
  return (
	  <button className='bg-slate-700 text-white py-2 px-6 rounded md:ml-8 hover:bg-slate-600 transition duration-300 ease-in-out'>
		<span className='text-xl'>{props.children}</span>
	</button>
  )
}

export default NavButton