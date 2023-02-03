const mongoose = require('mongoose')
const Schema = mongoose.Schema ;

Article = new Schema({
    title : {
        type :String ,
        required : '' ,
    },
    detail : {
        type : String ,
        default : '' ,
    },
    date : {
        type: String, 
        default : '0-0-0' ,
    },
    article : {
        type: String, 
        default : ''
    },

})

module.exports = {Article:mongoose.model('Article', Article )};
