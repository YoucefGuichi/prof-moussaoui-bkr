const mongoose = require('mongoose');
const Schema = mongoose.Schema ;



profil= new Schema({
    description : {
        type :String ,
        default:'nothing exist'
    },
    image : {
        type : String ,
        default : '/sc,zoc' ,
    }
});

module.exports = {profil: mongoose.model('profil', profil )};
