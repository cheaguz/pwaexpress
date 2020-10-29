const productModels = require('../models/productsModels');

module.exports = {
    create : async function ( req,res,next){
        const products = new productModels({
            name : req.body.name,
            sku : req.body.sku,
            price: req.body.price,
            quantity:req.body.quantity,
            image:req.body.image,
            description:req.body.description,
            category : req.body.category
        });
        const document = await products.save();
        res.json(products);
    },
    getAll : async function (req,res,next){
        const productos = await productModels.find({}).populate('category');
                if(productos.quantity==0){
                    res.json({message:"PRODUCTO FUERA DE STOCK"});
                }else{
                    res.json(productos);
                }
    },
    getById : async function(req,res,next){
        const product = await productModels.findById(req.params.id);
        if(product.quantity==0){
            res.json({message:"PRODUCTO FUERA DE STOCK"})
        }else{
            res.json(product);
        }
       
    },
       update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const productos = await productsModels.update({_id: req.params.id }, req.body , {multi : false});
        res.json(productos);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        const eliminar = await productsModels.deleteOne({_id: req.params.id });
        res.json(eliminar);
    }

    
   
}