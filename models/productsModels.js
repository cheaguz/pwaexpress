const mongoose = require('../bin/mongodb');
const categoriesSchema = require('../models/categoriesModels')

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
        }   
});

productsSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("products", productsSchema);

/*Denominación


▪ Precio de oferta




▪ Destacado
 */