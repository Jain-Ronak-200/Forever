import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import authUser from "../middleware/auth.js";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder,verifyRazorpay,verifyStripe } from '../controllers/orderController.js'



const orderRouter = express.Router()
// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// userfeature
orderRouter.post('/userorders',authUser,userOrder)

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter;
