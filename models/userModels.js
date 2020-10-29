const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');

const compraUserSchema = new mongoose.Schema({
    compras : {
        type : mongoose.Schema.ObjectId,
        ref :"products"
    }
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

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();

})

module.exports = mongoose.model("user", userSchema);


/*
▪ Nombre
▪ Apellido
▪ Email
▪ Contraseña
*/