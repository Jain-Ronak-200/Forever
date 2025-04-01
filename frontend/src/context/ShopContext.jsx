import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


 export const ShopContext = createContext();
 const ShopContextProvider = (props)=>{

    const currency = '$';
    const delivery_fee  = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[search,setSearch] = useState('');
    const[showSearch,setShowSearch]=useState(false);
    const[cartItems,setCartItems]= useState({});
    const navigate = useNavigate()
    // after backend --
    const[products,setProducts] = useState([]);
    const[token,setToken] = useState('');
    // ---

    const addToCart = async(itemId,size)=>{
        let cartData = structuredClone(cartItems);
        if(!size){
            toast.error('Select the product size')
            return;
        }
         if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]+=1;

                
            }
            else{
                cartData[itemId][size]=1
            }
            
         }
         else{
            cartData[itemId]={};
            cartData[itemId][size] = 1;
         }
          

         setCartItems(cartData);

         if (token) {
            try {
                await axios.post('http://localhost:4000/api/cart/add',{itemId,size},{headers:{token}})
                // console.log(userId)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
            
         }

    }
    const getCartCount= ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item]>0) {
                        totalCount += cartItems[items][item];
                        
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;

    }
    const getCartAmount= ()=>{
        let totalamount = 0;
        for(const items in cartItems){
            let iteminfo = products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalamount+= iteminfo.price*cartItems[items][item];

                    }
                } catch (error) {
                    
                }
            }
   
        }
        return totalamount;

    }
    // ---
    
    //---
    const updateQuantity = async (itemId,size,quantity)=>{
        let cartdata = structuredClone(cartItems);
        cartdata[itemId][size]= quantity;
        setCartItems(cartdata)
        if(token){
            try {
                await axios.post('http://localhost:4000/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
        }
        
        
    }
    const getUserCart = async(token)=>{
        try {
            
            const response = await axios.post('http://localhost:4000/api/cart/get', {}, { headers: { token } })
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
    useEffect(()=>{
    // console.log(cartItems)

   },[cartItems])
// after the backend
const getProductData = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/api/product/list')
        // console.log(response.data)
        if (response.data.success) {
            // console.log(response.data.products)
            setProducts(response.data.products)
            
        }
        else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}
useEffect(()=>{
    getProductData()
    

},[])
useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
        
    }

},)






    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
        

    }
    return(
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider>
    )
 }
 export default ShopContextProvider;
