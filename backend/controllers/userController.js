import userModel from "../models/usermodel.js";
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'



const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY)
}


// route for user login
const loginUser = async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"user not exist"})
            
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true,token})
            
        }
        else{
            res.json({success:false,message:"invalid credentails"})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error.message})
        
        
    }
    

}


// route for user registration

 const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        // checking user already exists or not
        const exist = await userModel.findOne({email});

        if(exist){
            return res.json({success:false, message:"user already exist"});
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"please enter a valid email"});

        }
        if(password.length<8){
            return res.json({success:false, message:"please enter a stroge password"});

        }

        // hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true,token})


 
         


    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error.message})
    }
    



 }

 // admin login route

 const adminLogin = async(req,res)=>{
    try {

        const{email,password}=req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY);
            res.json({success:true,token})
            
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        return res.json({success:false , message:error.message})

        
    }

 }



 export {loginUser,registerUser,adminLogin};