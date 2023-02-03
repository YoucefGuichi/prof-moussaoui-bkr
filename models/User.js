const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

User = new Schema({
	FirstName : {
		type : String ,
		required : true
	} ,
	LastName : {
		type : String ,
		required: true

	} ,
	Email : {
		type : String , 
		required : true ,
	} ,
	Password : {
		type : String ,
		required : true ,
	},
    
}) ;
module.exports = {User: mongoose.model('User', User )};
