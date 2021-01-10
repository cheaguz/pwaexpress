const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    register : async function ( req,res,next){
        try{
        const user = new userModels({
            user : req.body.user,
            name : req.body.name,
            lastname : req.body.lastname,
            password : req.body.password,
            email : req.body.email,
            compras : req.body.compras  
            });

            encryptPass = (data)=>{
            data.password = bcrypt.hashSync(data.password, 10);
            return user
           };

        const document = await encryptPass(user).save();
        
            res.json({message:"Usuario creado con exito"});
        }
        catch(e){
            console.log(e)
            res.json({message : "Hubo un error"})
        }
    },

    
    login : async function(req,res,next){
        const usuario = await userModels.findOne({user:req.body.user});
        if(usuario){
            if(bcrypt.compareSync(req.body.password , usuario.password)){
                const token = jwt.sign({usuarioId:usuario._id},req.app.get('userKey'));
                res.json({message:"user ok",token:token,usuarioId:usuario._id})
            }else{
                res.json({message:"Password incorrecto"});
            }
        }else{
            res.json({message : "Usuario incorrecto"});
        }
    },

    compra : async function (req, res, next) {
        console.log(req.params.id, req.body);
        const compra = await userModels.update({_id: req.params.id }, req.body , {multi : false});
        res.json({message : "Compra realizada con exito"});  
    },
    getById : async (req,res,next)=>{
        const user = await userModels.findById(req.params.id).populate("compras.product");
        res.json(user);
        }

       
    
}