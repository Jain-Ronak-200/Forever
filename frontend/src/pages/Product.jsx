import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { ShopContext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import Relatedproduct from '../components/Relatedproduct';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  
  const{productId}=useParams();
  // console.log(productId)
  const{products,currency,addToCart}=useContext(ShopContext);
  const[productData,setProductData]=useState(false)
  const[image,setImage]=useState('')
  const[size,setSize] = useState('')

  const fetchProductData = async()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])
        console.log(item)
        return null;
      }

    })

  }
  useEffect(()=>{
    fetchProductData();

  },[productId,products])
 
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row' >
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto scroll-smooth sm:overflow-y-scroll-hidden justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer justify-center items-center ' alt="" />
                
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img className='w-full h-auto ' src={image} alt="" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3 5' src={assets.star_icon}  alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_icon} alt="" />
            <img className='w-3 5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(388)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p>Selct Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item==size?'border-orange-600':''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 day.</p>
          </div>
        </div>


 
      </div>
      {/* describtion and reviwe selection  */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm '>Description</b>
          <p className='border px-5 py-3 text-sm '>Reviews (388)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod iste sapiente id deleniti placeat consequuntur reiciendis, at maiores quasi delectus dolorem vitae corporis saepe harum, cumque quidem, in odio perspiciatis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non rem enim, necessitatibus impedit sunt accusamus explicabo facere nihil aut inventore quia laudantium recusandae officiis pariatur placeat magnam dolores natus. Similique!</p>
          </div>
      </div>
      {/* display related products */}
      <Relatedproduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):<div className='opacity-1 text-center text-3xl justify-center items-center mt-12 sm:text-xs' >  SomeThing want wrong!!! <br /> <br /> <img className='items-center justify-center ml-[50%]' src={assets.cross_icon} alt="" /></div>
}

export default Product
