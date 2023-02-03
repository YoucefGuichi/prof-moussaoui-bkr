Modulee = require('../models/modulee').Modulee ;
Email = require('../models/email').Email ;
Cours = require('../models/cours').Cours ;
Td = require('../models/td').Td ;
Tp = require('../models/tp').Tp ;
User = require('../models/User').User ;
profil = require('../models/profil').profil;
article = require('../models/article').Article;

const passport = require('passport') ;
const local = require('passport-local').Strategy ;
const bcrypt = require('bcrypt') ;
var session = require('express-session') ;
module.exports = {
    index : (req,res)=>{
        profil.find().then(profil => {
        return res.redirect('/courses') ;
     });
        
    } ,
    contact : (req,res)=>{

        return res.render('default/contact') ;
        
    },
    submitmessage : (req,res)=>{
    newMessage = new Email({
        firstname: req.body.first ,
        lastname : req.body.last ,
        email : req.body.email ,
        body : req.body.body ,
    });
    newMessage.save().then( saved => {
       res.redirect('/contact') ;
    }

    ) 
    },
    getCourses :(req,res)=>{
        Cours.find()
        .populate('module')
        .then(cours=>{
            Td.find().then(td=>{
                Tp.find().then(tp=>{
                    Modulee.find().then(modulee=>{
                            res.render('default/courses',{modulee:modulee,leveel:modulee,td:td,tp:tp,cours:cours});
                    });
                });
            });
        });
    },
    GetSelecCourses : (req,res)=>{
       Cours.find({modulee:req.params.id})
         .then(cours=>{
             Td.find({modulee:req.params.id})
               .then(td=>{
                   Tp.find({modulee:req.params.id})
                       .then(tp => {
                           Modulee.find({ _id: req.params.id }).then(modulee => {
                            res.render('default/view',{cours:cours,td:td,tp:tp,modulee:modulee});
                           })
                               
                        
                        
                     })
               })
         }) 
       
    },
    GetResearch: (req, res) => {
        article.find().then(article => {
            res.render('default/research', { article: article });
        })
    },
    GetMarks: (req, res) => {
        res.render('default/showMarks'); 
    },
    getRegister : (req,res)=>{
        res.render('default/register') ;
    } ,
    postRegister : (req,res)=>{

    User.countDocuments({}).then(nbr=>{
       if(nbr==3){
        return res.send('<h1>registration are closed ! we are sory about that you can check with the admin ,  send messages to the admin for more information ^^ </h1>')
       } else{
        User.findOne({email:req.body.email}).then(founded=>{
            if(founded){
               return res.render('default/register',{err:"this user is already exist !"}) 
            }else{
                newUser = new User({
                    FirstName : req.body.fname ,
                    LastName : req.body.lname ,
                    Email : req.body.email,
                    Password : req.body.pass ,
                  });
                  newUser.save().then(user=>{
                     return res.redirect('/login') 
                  }) ; 
            }
           
        });
       }
      
    });
      
    },
    getLogin : (req,res)=>{
        res.render('default/login');
    },
    postLogin : (req,res)=>{
     user = req.body.email ;
      pass = req.body.password;
      
     User.findOne({Email:user,Password:pass}).then(Correct=>{
         if(!Correct){
            return res.redirect("/login");  
         }
          req.session.user = {user:user} ;
         return res.redirect("admin/courses");
     }).catch(err=>{
         console.log(err);
         return res.redirect('/login');
     });
      
       

    
    },
    GetLogout:(req,res)=>{

        
        req.session.destroy();
         return res.redirect('/');
       
       },

    

} 