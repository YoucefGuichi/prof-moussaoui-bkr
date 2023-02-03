module.exports = {
    mongodbUrl://'mongodb://localhost:27017/tutora',
        'mongodb+srv://mss:mss@moussaoui-hgh3x.mongodb.net/test?retryWrites=true&w=majority',
   
    host://'http://127.0.0.1:3000',
        'https://moussaouiboubakeurr.herokuapp.com',
    isEmpty : function(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                return false ;
            }
        }
        return true ;
    } ,
   

             
            
            

          
    
    
}