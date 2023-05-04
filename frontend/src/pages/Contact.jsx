import React from 'react';
import ContactForm from '../components/ContactForm';

function Contact() {

  return (
    <div className='w-full min-h-screen py-16 px-4 shadow-lg bg-slate-200 mt-16'>
      <div className='max-w-[1000px] mx-auto'>
        <h1 className='text-slate-800 md:text-4xl text-2xl font-bold'>CONTACT US</h1>
        <p className='text-slate-950 content-center md:text-xl text-lg p-2'>
          We're here to help!
          <br />
          <br />
          If you have any questions, comments, or concerns, please don't hesitate to contact us.
          <br />
          Our team is dedicated to providing the best user experience and support for our customers.
          <br /><br />
          To get in touch with us, please use the contact form below.
          <br />
          We'll do our best to respond to your message as soon as possible.
          <br />
          <br />
          Thank you for choosing our survey website, and we look forward to hearing from you!
        </p>
      </div>
      <div className='w-full flex items-center justify-center'>
        <ContactForm />
      </div>
      <div className='max-w-[1000px] mx-auto'>
        <p className='text-slate-950 content-center md:text-xl text-lg p-2'>
          Alternatively, you can reach out to us directly:
          <ul>
            <li>Email: support@softwareprogrammingquiz.com</li>
            <li>Phone: 123-456-7890</li>
          </ul>
        </p>
        <br />
      </div>
    </div>
  )
}

export default Contact;