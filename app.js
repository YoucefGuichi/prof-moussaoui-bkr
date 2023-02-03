const express = require('express') ;
const mongoose = require('mongoose') ;
const {mongodbUrl} = require('./config/configuration') ;
const path = require('path');
const session = require('express-session') ;
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const hbs = require('express-handlebars');
const methodOvrride = require('method-override') ;
const fileupload = require('express-fileupload') ;
const multer = require('multer') ;
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: mongodbUrl,
    collection: 'sessions'
});
const app = express() ;

// configure mongoose to connect to mongodb 

mongoose.connect(mongodbUrl,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(response =>{
    console.log('mongodb connect successffully  ');
}).catch(err =>{
    console.log("CONNECTION FAILED !") ;
    console.log(err);
}) ;

// configure express 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// sessions

app.use(session({
    secret: 'secret token',
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: store,
    name: 'session cookie name'
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// flash 
app.use(flash());

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'default'}));
app.set('view engine' , 'handlebars');

// method override 
app.use(methodOvrride('newMethod')) ;

// file upload 
app.use(fileupload());
// Routes 

const defaultRoutes = require('./routes/defaultRoutes') ;
const adminRoutes = require('./routes/adminRoutes') ;


app.use('/',defaultRoutes) ;
app.use('/admin',adminRoutes) ;



port = process.env.PORT || 3000 ;
app.listen(port,()=>{
console.log('server is running on Port '+port) ;
})  ;



