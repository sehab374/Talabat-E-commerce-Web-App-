import { AppError } from "../utils/appError.js"

export const validation=(schema)=>{
    return(req,res,next)=>{
        let filters={}
        // if(req.file||req.files)
        if(req.file)
        {
            // filters={image:req.file?req.file:req.files, ...req.body, ...req.params, ...req.query}
            filters={image:req.file , ...req.body, ...req.params, ...req.query}
        }
        else if(req.files)
        {
            filters={...req.files, ...req.body, ...req.params, ...req.query}
        }
        else
        {
            filters={ ...req.body, ...req.params, ...req.query}
        }
        
       let {error}= schema.validate(filters ,{abortEarly:false})
       //console.log(error);
       if(!error)
       {
        next()
       }
       else
       {
        let errorList=[]
        error.details.forEach(element => {
            errorList.push(element.message)
            
        });
        // console.log(errorList);
        next(new AppError(errorList,401))

       }
    }
}