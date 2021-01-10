const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');
const productModel = require('../models/productsModels')

const compraUserSchema = new mongoose.Schema({
  
        product : {
            type: mongoose.Schema.ObjectId,
            ref:"products"
        },
        price : Number,
        quantity : Number,
        total : Number,
        status : String,
        ventaId : String
    
})


const userSchema = new mongoose.Schema({
    user : {
        type : String,
        index : true
    },
    name : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    compras: [compraUserSchema]
});

//Al hacer la venta y el save de user (salesController , 83) se aplicaba el pre ("save") y se modificaba la contraseña

/*userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
});*/

module.exports = mongoose.model("user", userSchema);

