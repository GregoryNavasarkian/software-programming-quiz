import React from 'react';

const NotFound = () => {
  return (
    <main className="grid min-h-screen w-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-slate-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-lg leading-7 text-slate-600">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/" className="rounded-md bg-slate-700 px-3.5 py-2.5 text-sm font-semibold text-slate-100 shadow-sm hover:bg-slate-600 transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">Go back home</a>
          <a href="/contact" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </main>
  )
}

export default NotFound;