const mongoose = require('../bin/mongodb');
const categoiesSchema = require('../models/categoriesModels')

const productsSchema = new mongoose.Schema({
        name :{
            type : String,
            required : true
        },
        sku : {
            type : Number,
            unique : true,
            index : true,
            required : true
          
         },
        price : {
            type : Number,
            required : true
            
         },
        quantity : {
            type : Number,
            required : true
        },
        image : {
            type : String
         },
        description : {
            type : String,
            required : true
           
         },
        category : {
            type: mongoose.Schema.ObjectId,
            ref:"categories"
        },
});

module.exports = mongoose.model("products", productsSchema);
/*
"name": ,
"sku": ,
"price": ,
"quantity" : ,
"image" ,
"description": ,
"category": ,

//"_id": "5f848cd01132a8021886e80c",

*/
/*Denominación


▪ Precio de oferta




▪ Destacado
 */