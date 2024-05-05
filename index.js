import * as dotenv from 'dotenv'
dotenv.config({})
import express from 'express'
import { dbConnection } from './database/connection.js'
import allRoutes from './src/modules/routes.js'
import { AppError } from './src/utils/appError.js'
const app=express()
app.use(express.json())
app.use("/uploads",express.static("uploads"))

dbConnection()
allRoutes(app)

app.get('/',(req,res)=>{
    res.send("hello in e-commerce app")
})

app.use("*",(req,res,next)=>{
    next(new AppError("url not found",404))
})

app.use((err, req, res, next) => {
    //console.log("message",err.message)
    // console.log("stack",err.stack)
    process.env.MODE == 'dev' 
    ? res.status(err.statusCode).json({ err: err.message, stack: err.stack })
    : res.json({ err: err.message })
  })

app.listen(3000,()=>{
    console.log("server is running ...");
})  