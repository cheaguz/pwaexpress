const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
    user : {
        type : String,
        index : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }
});


adminSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();

})
module.exports = mongoose.model("admin", adminSchema);