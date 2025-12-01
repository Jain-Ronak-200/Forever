import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import Productitem from './Productitem';
import { ShopContext } from '../context/ShopContext'
// import { ShopContext } from '../context/Shopcontext';






const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const[latestproducts,setLatestproducts]=useState([]);
    useEffect(()=>{
        setLatestproducts(products.slice(0,10))

    },[products])

  
    

    
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLEXTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ipsa sint vitae architecto, iste aut repudiandae nam quasi nemo quas nostrum, quidem
             repellat et quam ullam quo fuga? Deleniti, mollitia</p>
        </div>
        
        {/* rendering products form poductitem.jsx */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        
            {
                latestproducts.map((item,index)=>(
                    <Productitem key={index} image={item.image} name={item.name} id={item._id}  price={item.price}/>
                ))

            }
        </div>
      
    </div>
  )
}

export default LatestCollection;
