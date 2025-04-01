import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'; // Ensure backendUrl is correctly exported from App
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
    
    const[email,SetEmail] = useState('')
    const[password,SetPassword] = useState('')
    const onSubmitHandler = async(event)=>{
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:4000/api/user/admin',{email,password});
            // console.log(response)
            if(response.data.success){
                setToken(response.data.token)

            }
            else{
                toast.error(response.data.message)
            }



            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }

    }
  

return (
    <div>
        <h1 className='text-3xl flex items-center mx-7 my-7 justify-center'>ADMIN PANEL</h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex item-center gap-2 mb-2 mt-10'>
                <p className='prata-ragular text-3xl'>Login</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800 mt-[17.8px]' />
            </div>
            <input onChange={(e)=>SetEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
            <input  onChange={(e)=>SetPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
            <div className='w-full flex justify-between text-sm mt-[-8px]'>
                
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4'>login in</button>
        </form>
    </div>
)
}

export default Login
