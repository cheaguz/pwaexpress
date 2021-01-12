const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../bin/email');
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

    getById : async (req,res,next)=>{
        const user = await userModels.findById(req.params.id).populate("compras.product");
        res.json(user);
        },
        
    requestNewPassword : async(req,res,next)=>{
        const usuario = await userModels.findOne({user:req.body.user});
        if(usuario){
            generatePass = ()=>{
                 let arreglo=[];
                 let characters=["!","@","#","a","b","c","1","2","3"];
                 for(var i=0;i<=9;i++){
                    arreglo[i] = characters[parseInt(Math.random()*characters.length)];
                 };
                 let password = arreglo.join('');
                return password
            };

            encryptPass = (data)=>{
                data = bcrypt.hashSync(data, 10);
                return data
               };

            const password = generatePass();
            const passwordEncrypt = encryptPass(password);
              
            const updateUser = await userModels.update({_id:usuario._id},{password : passwordEncrypt},{multi:false});

            const mail = await transporter.sendMail({
                from : "ecommercepwa1@gmail.com",
                to : usuario.email,
                subject : "Solicitud de cambio de password",
                text : "Este es tu nuevo password , porfavor cambialo al ingresar: "+password
            });
             
            res.json({message: "Enviamos un mail con tu nuevo password,Por favor modificalo"})
            
        }else{
            res.json({message : "Usuario no encontrado."})
        };
    },
        updatePassword : async (req,res,next)=>{
      
              encryptPass = (data)=>{
                data = bcrypt.hashSync(data, 10);
                return data
               };

            const password = encryptPass(req.body.password);
            const user = await userModels.update({_id:req.params.id},{password : password},{multi:false});
            res.json({message:"Cambio exitoso!"})
               
        }
}
    