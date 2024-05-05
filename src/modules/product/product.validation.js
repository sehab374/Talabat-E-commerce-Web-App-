import Joi from 'joi'

// title
// slug
// description
// price
// priceAfterDiscound
// imageCover
// images
// sold+
// quantity
// rateCount+
// rateAvag+
// category
// subCategory
// brand
//createdBy

export const addProductSchema = Joi.object({

    title: Joi.string().min(3).max(30).required().trim(),
    description: Joi.string().min(3).max(300).required().trim(),
    price: Joi.number().min(0).required(),
    priceAfterDiscound: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).optional(),
    //////////////////imageCover will be array 
    imageCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()
    }).required()).required(),
    //////////////////imageCover will be array 
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()
    }).required()).required()
})

export const getByIdSchema = Joi.object({
    id: Joi.string()
        .hex()
        .length(24)
        .required()
})

export const updateProductSchema = Joi.object({
    //////get it from params
    id: Joi.string()
        .hex()
        .length(24)
        .required(),
    //////get it from body 
    
    title: Joi.string().min(3).max(30).required().trim(),
    description: Joi.string().min(3).max(300).required().trim(),
    price: Joi.number().min(0).required(),
    priceAfterDiscound: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).optional(),
    //////////////////imageCover will be array 
    imageCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()
    }).required()).required(),
    //////////////////imageCover will be array 
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        ////5242880=>max size of image
        size: Joi.number().max(5242880).required()
    }).required()).required()
})

