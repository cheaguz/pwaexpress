const productModels = require('../models/productsModels');


module.exports = {
    create : async ( req,res,next)=>{
        try{
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
    }
    catch(e){
        console.log(e)
    }
    },
    getAll : async (req,res,next)=>{
        let queryFind = {};
        if(req.query.buscar){
            queryFind = {name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
        };
        if(req.query.min && req.query.max){
            queryFind = {$and:[
                {price :{$gt:req.query.min}},
                {price:{$lt:req.query.max}}
            ]}
        };
        
        try {
        const productos = await productModels.paginate(queryFind,{
            populate:"category",
            page : req.query.page || 1}
            );
                 res.json(productos); 
                }
                catch(e){
                    console.log(e)
                }  
    },
    getById : async (req,res,next)=>{
        const product = await productModels.findById(req.params.id).populate("category");
            res.json(product);
        
       
    },


    getByCategory : async function(req,res,next){
        const product = await productModels.find({category:req.params.cat}).populate("category");
       if(product.quantity==0){
            res.json({message:"PRODUCTO FUERA DE STOCK"})
        }else{
            res.json(product);
        }
        res.json(product)
       
    },

       update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const productos = await productModels.update({_id: req.params.id }, req.body , {multi : false});
        res.json(productos);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        try{
            const eliminar = await productModels.deleteOne({_id: req.params.id });
            res.json(eliminar);
        }
        catch(e){
            console.log(e)
        }
       
    }

    
   
}