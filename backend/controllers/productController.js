import {v2 as cloudinary} from 'cloudinary';
import { parse } from 'dotenv';
import productModel from '../models/productmodel.js';




// fuction for add product

const addProduct = async(req, res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestSeller} = req.body;


        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
        
        
        const images =[image1,image2,image3,image4].filter((item)=> item!== undefined)
        
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'}) 
                return result.secure_url
    })
        )
        const productData = {
            name,
            description,
            category,
            subCategory,
            price:Number(price),
            bestSeller:bestSeller === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()

        }
        // console.log(productData)
        const product = new productModel(productData);
        await product.save()
        
        // console.log(name,description,price,category,subCategory,sizes,bestSeller);
        // console.log(imagesUrl)
        res.json({success:true, message:"product added"})
        // console.log("Uploaded files:", req.files);
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    




}


// function for list product
const listProduct = async(req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }



    
}










// function for remove product

const removeProduct = async(req, res)=>{
    try {
        await productModel.findOneAndDelete(req.body.id);
        res.json({success:true,message:"Product removed successfully"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }



    
}

//fuction for single product info
const singelProduct = async(req, res)=>{
    try {
        const {productId}= req.body;
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }



    
}


export{listProduct,addProduct,removeProduct,singelProduct}