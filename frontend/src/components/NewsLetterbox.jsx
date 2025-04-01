import React, { useState } from 'react'

const NewsLetterbox = () => {
    const[user,setUser]=useState('');
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        setUser('')
     
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subsribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit ametlo unde!</p>
        <form onSubmit={(e)=>{
            onSubmitHandler(e);

        }} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6  border pl-3' >
            <input  value={user}  onChange={(e)=>{
                setUser(e.target.value)
            }} className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
            <button  type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default NewsLetterbox
