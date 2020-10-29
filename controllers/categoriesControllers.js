const categoriesModels = require('../models/categoriesModels');

module.exports = {
    create : async function ( req,res,next){
        const category = new categoriesModels({
            name : req.body.name  
            });
        const document = await category.save();
        res.json(category);
    },
    getAll : async function (req,res,next){
        const category = await categoriesModels.find({});
        res.json(category);
    },
    getById : async function(req,res,next){
        const category = await categoriesModels.findById(req.params.id);
        res.json(category);
    },
       update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const category = await categoriesModels.update({_id: req.params.id }, req.body , {multi : false});
        res.json(category);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        const eliminar = await categoriesModels.deleteOne({_id: req.params.id });
        res.json(eliminar);
    }

    
   
}