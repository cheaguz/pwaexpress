const salesModels = require('../models/salesModels');
const productModels = require('../models/productsModels');
const app = require('../app');
const userModels = require('../models/userModels');

module.exports = {
    create : async function ( req,res,next){
        //FALTA VALIDACION TOKEN    
        const producto = await productModels.findById(req.body.product_id)
        const usuario = req.body.user_id;
        const user = await userModels.findById(req.body.user_id)
        
        if(producto.quantity==0){
            res.json({msg:"Producto Fuera de stock!"})
        } else if(req.body.cantidad > producto.quantity){
            res.json({msg:"STOCK INSUFICIENTE"})
        } else if(!usuario){
            res.json({msg:"usuario no encontrado"})
        }
            else{
                try{ 
            const sales = new salesModels({
                user_id : req.body.user_id,
                product_id : req.body.product_id,
                cantidad : req.body.cantidad,
                priceWeb : req.body.priceWeb,
                priceProd : producto.price,
                totalDB : req.body.cantidad*producto.price,
                totalWeb : req.body.totalWeb,
                pago : req.body.pago,
                status : req.body.status
                });
            const document = await sales.save();       
            if(document){
                const id = req.body.user_id;
                 compra = {
                     ventaId : document._id,
                     product : req.body.product_id,
                     price : sales.priceWeb,
                     quantity : sales.cantidad,
                     total : sales.totalDB,
                     status : sales.status
                }
              

               producto.quantity=producto.quantity - req.body.cantidad
                doc= await producto.save();  
                const userUpdate= await userModels.update({_id : id},{$push:{compras:[compra]}} ,{multi : false})
            }
                res.json(document);
        }
        catch(e){
            console.log(e)
        };
    }
    
    },
    getAll : async function (req,res,next){
        try{
        const sales = await salesModels.paginate({},{
            populate : ["product_id","user_id"],
            page : req.query.page || 1}
            );
        res.json(sales);
    }catch(e){
        console.log(e)
    };
    },
    getById : async function(req,res,next){
        const sale = await salesModels.findById(req.params.id).populate("user_id").populate("product_id");
        res.json(sale);
    },
       update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        try{
        const idVenta = req.params.id;
        const sale= await salesModels.findById(req.params.id);
        const user = await userModels.findById(sale.user_id);
        const userCompras = user.compras;

        for(var i = 0; i<userCompras.length;i++){
            if(userCompras[i].ventaId == idVenta){
                user.compras[i].status = req.body.status;   
            }
        }
        user.save();
        const sales = await salesModels.update({_id: req.params.id }, req.body , {multi : false});

        res.json(sales);
    }
    catch(e){
        console.log(e)
    }
    },

    delete: async function (req, res, next) {
        console.log(req.params.id);
        const eliminar = await salesModels.deleteOne({_id: req.params.id });
        res.json(eliminar);
    }

    
   
}

