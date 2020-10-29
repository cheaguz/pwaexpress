const userAdminModels = require('../models/userAdminModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    register : async function ( req,res,next){
        const user = new userAdminModels({
            user : req.body.user,
            password : req.body.password,
            email : req.body.email  
            });
        const document = await user.save();
        res.json(document);
    },
    
    login : async function(req,res,next){
        const userAdmin = await userAdminModels.findOne({user:req.body.user});
        if(userAdmin){
            if(bcrypt.compareSync(req.body.password , userAdmin.password)){
                const token = jwt.sign({userId:userAdmin._id},req.app.get('adminKey'));
                res.json({message:"user ok",token:token})
            }else{
                res.json({message:"Password incorrecto"});
            }
        }else{
            res.json({message : "Usuario incorrecto"});
        }
    },
    
}