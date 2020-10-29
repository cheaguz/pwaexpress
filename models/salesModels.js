const mongoose = require('../bin/mongodb');
const paymentSchema = new mongoose.Schema({
    pay :{
        type : String,
        enum: ["efectivo","mercadopago"]
    },
    date : {
        type : Date,
        default : Date.now
    },
    status: {
        type : String,
        enum : ["pendiente","pagado","no_pagado"]
    },
   
});

const salesSchema = new mongoose.Schema({
    user_id :{
         type : mongoose.Schema.ObjectId,
         ref : "user"
    },
    product_id :{
         type : mongoose.Schema.ObjectId,
         ref : "products"
    },
    importe :{
        type : Number,

    },
     monto : {
        type : Number
     },
    pago :[paymentSchema]
    
});

module.exports = mongoose.model("sales", salesSchema);