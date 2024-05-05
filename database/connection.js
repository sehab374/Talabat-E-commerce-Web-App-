import mongoose from "mongoose";

//export const connection=()=>{


export const dbConnection=()=> {
    mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("database error",err);
    })
    
}