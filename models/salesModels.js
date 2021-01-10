const mongoose = require('../bin/mongodb');

const salesSchema = new mongoose.Schema({
    user_id :{
         type : mongoose.Schema.ObjectId,
         ref : "user"
    },
    cantidad :{
        type : Number
    },
    product_id :{
         type : mongoose.Schema.ObjectId,
         ref : "products"
    },
    priceWeb :{
        type : Number,

    },
    priceProd : {
        type : Number,
    },
     totalDB : {
        type : Number
     },
     totalWeb : {
         type : Number
     },
    pago : {
        type : String,
        enum : ["Efectivo", "Mercado_pago"]  
    },
    status : {
        type : String,
        enum : ["pendiente","aprobado","rechazado"],
        default : "pendiente"
    },
    date : {
        type : Date,
        default : Date.now
    }
    
});

salesSchema.plugin(mongoose.mongoosePaginate);

module.exports = mongoose.model("sales", salesSchema);