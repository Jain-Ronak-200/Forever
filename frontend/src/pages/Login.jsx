import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // after backend ------
  const{token,setToken,navigate} = useContext(ShopContext);
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  
  // ----
  const[currentState,setCurrentState] = useState('Login');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    // e.target.value('');
    // after backend --
    try {
      if (currentState==='sign up') {
        const response = await axios.post('https://forever-nine-xi.vercel.app/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          navigate('/')

        }
        else{
          toast.error(response.data.message || 'Login failed')
        }
        
        
      }
      else{
        const response = await axios.post('https://forever-nine-xi.vercel.app/api/user/login',{email,password})
        // console.log(response.data)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          navigate('/')

        }
        else{
            toast.error(response.data.message || 'Login failed')
        }
        
      }
      // -----
      
    } catch (error) {
      console.log(error)
      toast.error(error)
      
    }
  }
  useEffect(()=>{
    if (token) {
      navigate('/')
      
    }

  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex item-center gap-2 mb-2 mt-10  '>
        <p className='prata-ragular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 mt-[17.8px]' />
      </div>
  
      {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name' required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800  ' placeholder='Email'  required/>
      <input  onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" className='w-full px-3 py-2 border border-gray-800  ' placeholder='Password'required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer  hover:text-red-900'>Forgot your password ?</p>{
          currentState==='Login'
          ? <p className='cursor-pointer hover:text-blue-900 ' onClick={()=>setCurrentState('sign up')}>Create account</p>
          : <p className='cursor-pointer hover:text-blue-900' onClick={()=>setCurrentState('Login')}>Login here</p>
        }

      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign in':'Sign up'}</button>
   
      
    </form>
  )
}

export default Login
