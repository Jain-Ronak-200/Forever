import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';
import{currency} from '../App'

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null

    }
    try {
      const response = await axios.post('http://localhost:4000/api/order/list', {}, { headers: { token } })
      console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders.reverse())

      }
      else {
        toast.error(error.message)
      }



    } catch (error) {
      toast.error(error.message)

    }



  }
  const statusHandler = async(event,orderId)=>{
    try {
       const response = await axios.post('http://localhost:4000/api/order/status',{orderId,status:event.target.value},{headers:{token}}) 
       if(response.data.success){
        await fetchAllOrders()
       }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  useEffect(() => {

    fetchAllOrders()


  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      {
        orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p08 my-3 md:my-4  text-xs sm:text-sm texr-gray-700' key={index} >
            <img className='w-12' src={assets.parcel_icon} alt="" srcset="" />
            <div>




              <div>{order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return <p className='py-0.5' key={index}>{item.name}x{item.quantity}  <span>{item.size}</span> </p>

                }
                else {

                  return <p className='py-0.5' key={index}>{item.name}x{item.quantity}  <span>{item.size}</span>, </p>
                }


              })}</div>
              <p className='mt-3 mb-2  font-medium'>{order.address.fristName + '' + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode} </p>

              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
            <div className='text-sm sm:text-[15px]'><p>Item : {order.items.length}</p></div>
            <div className='mt-3'><p>Method : {order.paymentMethod}</p></div>
            <div><p>Payment : {order.payment?'Done':"Panding"}</p></div>
            <div><p>Date : {new Date(order.date).toLocaleDateString()}</p></div>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold' >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

        ))
      }

    </div>
  )
}

export default Order
