const mongoose = require('../bin/mongodb');

const categoriesSchema = new mongoose.Schema({
    name : {
        type : String
    },
    image: {
        type : String
    }
});

module.exports = mongoose.model("categories", categoriesSchema);