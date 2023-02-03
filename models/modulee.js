const mongoose = require('mongoose')
const Schema = mongoose.Schema ;



modulee = new Schema({
    title : {
        type : String ,
        required:true,
    },
    description : {
        type : String 
    },
    level:{
        type:String 
    }
})

module.exports = {Modulee: mongoose.model('module', modulee )};
