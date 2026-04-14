import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'


//api for adding doctor
const addDoctor=async(req,res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body;
        const imageFile=req.file
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success:false,
                message:"Missing details"
            })
        }

            //validation email format
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"please enter the valid email"})
            }

            //validating password
            if(password.length<8){
                return res.json({success:false,message:"please enter a strong password with atleast 8 number"})
            }

            //hashing doctor password
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)

            //uplaod image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl=imageUpload.secure_url

            const doctorData={
                name,
                email,
                image:imageUrl,
                password:hashedPassword,
                speciality,
                degree,
                experience,
                about,
                fees,
                address:JSON.parse(address),
                date:Date.now()
            }

            const newDoctor=new doctorModel(doctorData)
            await newDoctor.save()
            res.json({success:true,message:"Doctor added"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor}