const salesModels = require('../models/salesModels');

module.exports = {
    create : async function ( req,res,next){
        const sales = new salesModels({
            user_id : req.body.user_id,
            product_id : req.body.product_id,
            importe : req.body.importe,
            pago : req.body.pago
            });
        const document = await sales.save();
            res.json({message : "venta creada con exito"});
    },
    getAll : async function (req,res,next){
        const sales = await salesModels.find({}).populate("user_id").populate("product_id");
        res.json(sales);
    },
    getById : async function(req,res,next){
        const sale = await salesModels.findById(req.params.id).populate("user_id").populate("product_id");
        res.json(sale);
    },
       update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const sale = await salesModels.update({_id: req.params.id }, req.body , {multi : false});
        res.json(sale);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        const eliminar = await salesModels.deleteOne({_id: req.params.id });
        res.json(eliminar);
    }

    
   
}