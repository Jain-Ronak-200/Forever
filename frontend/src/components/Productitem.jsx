// import React, { useContext } from 'react'
// import { ShopContext } from '../context/Shopcontext'
// import { Link } from 'react-router-dom';

// const Productitem = ({id,image=['/default-image.jpg'],name,price}) => {
//     const {currency}= useContext(ShopContext);
  

//   return (
//     <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`} >
//         <div className='overflow-hidden'>
//             <img className='hover:scale-110 transition ease-in-out' src={Array.isArray(image) && image[1] ? image[1] : '/default-image.jpg'} alt="" />
//         </div>
//         <p className='pt-3 pb-1 text-sm'>{name}</p>
//         <p className='text-sm font-medium'>{currency}{price}</p>
//     </Link>

//   )
// }

// export default Productitem
import React, { useContext } from 'react';
// import { ShopContext } from '../context/Shopcontext';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Productitem = ({ id = 'unknown', image = ['/default-image.jpg'], name = 'Unknown Product', price = 0 }) => {
    const { currency } = useContext(ShopContext);

    if (!currency) {
        console.error("Currency is not defined in ShopContext.");
        return null;
    }

    return (
        <Link 
            className='text-gray-700 cursor-pointer' 
            to={id ? `/product/${id}` : '/product/unknown'} 
        >
            <div className='overflow-hidden'>
                <img 
                    className='hover:scale-110 transition ease-in-out' 
                    src={Array.isArray(image) && image[1] ? image[1] : image[0] || '/default-image.jpg'} 
                    alt={name || 'Product Image'} 
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency || '$'}{price}</p>
        </Link>
    );
};

export default Productitem;

