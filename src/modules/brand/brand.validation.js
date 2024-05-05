import Joi from 'joi'

export const addBrandSchema=Joi.object({
    title: Joi.string().min(3).max(30).required(),
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()

      }).required(),

    // /////////id of category
    // category:Joi.string().hex().length(24).required(),
    
})

export const getByIdSchema=Joi.object({
    id: Joi.string()
    .hex()
    .length(24)
    .required()
})

export const updateBrandSchema=Joi.object({
    //////get it from params
    id: Joi.string()
    .hex()
    .length(24)
    .required(),
    //////get it from body 
    title: Joi.string()
    .min(3)
    .max(30)
    .required(),
    /////////////in case of update image
    image:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()

      }).required(),
})

