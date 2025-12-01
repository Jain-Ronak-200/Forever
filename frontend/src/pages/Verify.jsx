import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const{navigate,token,setCartItems}= useContext(ShopContext);
    const[searchParams,setSearchParams] = useParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async()=>{
        try {
            if (!token) {
                return null
                
            }
            const response = await axios.post('https://forever-nine-xi.vercel.app/api/order/verifyStripe',{success,orderId},{headers:{token}})
            console.log(response.data)
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
                
            }else{
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.error.message)
            
        }

    }

    useEffect(()=>{
        verifyPayment()

    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
