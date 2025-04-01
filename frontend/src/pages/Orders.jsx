import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/Shopcontext'
import Title from '../components/Title';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const { currency,token} = useContext(ShopContext);
  // console.log(products)
  const[orderData,setOrderData] = useState([]);
  const loadOrderData = async()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post('http://localhost:4000/api/order/userorders' ,{},{headers:{token}});
      // console.log(response.data);
      if(response.data.success){
        let allordersItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allordersItems.push(item)
          })
        })
        // console.log(allordersItems)
        setOrderData(allordersItems.reverse())
      }
      
    } catch (error) {
      
    }
  }
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
  };
  useEffect(()=>{
   loadOrderData()
  },[token])


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={'ORDERS'} />


      </div>
      <div>
        {
          orderData.map((item, index) => {
            return (
              <div className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
              <div className='flex items-start gap-6 text-sm'>
                {/* <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} /> */}
                <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-21text-base text-gray-500'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='md:text-base text-sm'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track order</button>
              </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Orders
