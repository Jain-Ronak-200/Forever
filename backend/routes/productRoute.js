import express from 'express';
import { listProduct,addProduct,removeProduct,singelProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';



const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',adminAuth,singelProduct);
productRouter.get('/list',listProduct);

export default productRouter;