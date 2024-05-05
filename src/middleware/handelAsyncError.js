
import { AppError } from "../utils/appError.js"
export const handleAsyncError=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
        next(new AppError(err.massage,401))})
    }
}

// export function handleAsyncError(fn) {

//     return (req,res,next)=>{
//         fn(req,res,next).catch(err=>{
//             // res.json({message:"error is here" ,err})
//             ////daa elly hyshaghal el global handle error
//             next(err)
//         })
//     }
// }
