import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} alt="" className='mb-5 w-32' />
                    <p className='w-1/2 md:w-2/3 text-gray-600'>Lorem aspernatur soluta illo totam iusto minam amet, pe qui ea et neque.</p>
                </div>
                <div>
                    <p id='about' className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p id='contact' className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-43-2332-45322</li>
                        <li>forever11@gmil.com</li>
                    </ul>
                </div>
            </div>
            <div > <hr  className='bg-gray-800'/>
            <p className='py-5 text-sm text-center text-gray-500'>Copyright 2025 @ Forever.com -All Right Reserved</p></div>
        </div>
    )
}

export default Footer
