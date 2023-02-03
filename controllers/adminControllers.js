Modulee = require('../models/modulee').Modulee ;
Email = require('../models/email').Email ;
Cours = require('../models/cours').Cours ;
Td = require('../models/td').Td ;
Tp = require('../models/tp').Tp ;
User = require('../models/User').User ;
remModule = require('../models/remModule').remModule ;
profil = require('../models/profil').profil;
article = require('../models/article').Article;
var mv = require('mv');
const {host} = require('../config/configuration') ;
const {isEmpty} = require('../config/configuration') ;
const {moveFilesToUploadFloder} = require('../config/configuration') ;
var session = require('express-session') ;
module.exports = {
    index : (req,res)=>{
        user = req.session.user ;
        if(user){
            return res.redirect('admin/courses');
        }else{
           return res.redirect('/login'); 
        }
       
    } ,
    getIndexModules : (req,res)=>{
        user = req.session.user ;
        if(user){
        Modulee.find()
          .then( Modules =>{
              res.render('admin/modulee/index',{modules:Modules});
          }) ;   
        }else{
            return res.redirect('/login');
        }      
    },
    
    postCreateModelData :(req,res)=>{
        user = req.session.user ;
        if(user){
        newModule = new Modulee({
            title:req.body.title,
            description : req.body.description ,
            level : req.body.level
        });
        newModule.save().then(post =>{  
            const url = host+"/admin/modules" ;
            res.redirect(url);
        });
    }else{
        return res.redirect('/login');
    }
        
    },
    getEditPage : (req,res)=>{
        user = req.session.user ;
        if(user){
        Modulee.findById(req.params.id).then((modulee=>{
            res.render('admin/modulee/edit',{modulee:modulee}) ;
        }));
    }else{
             return res.redirect('/login');
        }
         
    },
    submitTheEditPage : (req,res) =>{
        user = req.session.user ;
        if(user){
    Modulee.findById(req.params.id)
    .then(post =>{
        post.title = req.body.title ;
        post.save().then(editedPost =>{
            const url = host+"/admin/modules" ;
            res.redirect(url);
            
        }) ;
    });
}else{
    return res.redirect('/login');
}  
    },

    deleteModule:  (req,res) =>{
        user = req.session.user ;
        if(user){
    Modulee.findByIdAndDelete(req.params.id)
    .then(deletemodule =>{
        const url = host+"/admin/modules" ;
        res.redirect(url);
       })  ;
    }else{
        return res.redirect('/login');
    }
    },
    getAllmails : (req,res)=>{
        user = req.session.user ;
        if(user){
        Email.find().then(emails=>{
            res.render('admin/emails/index',{emails:emails});
        }) ;
    }else{
        return res.redirect('/login');
    }
        
    } ,
    deletemessage : (req,res)=>{
        user = req.session.user ;
        if(user){
        Email.findByIdAndDelete(req.params.id)
        .then(deletedmessage=>{
            const url = host+"/admin/emails" ;
            res.redirect(url) ;
        }) ;
    }else{
        return  res.redirect('/login'); 
    }
    } ,
    getInsertCours : (req,res) =>{
        user = req.session.user ;
        if(user){
        Modulee.find()
        .then(modulee=>{
         res.render('admin/insertModuleData/insertCours',{modulee:modulee}) ; 
        }) 
    }else{
        return res.redirect('/login'); 
    }
        
    } ,
    submitCours : (req,res)=>{
        user=req.session.user ; 
        if(user){
            const newcours = new Cours({
                name : req.body.title ,
                modulee : req.body.modulee ,
                linkk : req.body.linkk 
            }) ;
            newcours.save().then(courss =>{
              const url = host+"/admin/courses" ;
              res.redirect(url) ;
            }) ;
        }else{
            return res.redirect('/login');
        }
      
     
    },
    getCoursesTdsTps : (req,res) =>{
        user=req.session.user ; 
        if(user){
            Cours.find()
        .populate('module')
        .then(cours=>{
            Td.find().then(td=>{
                Tp.find().then(tp=>{
                    Modulee.find().then(modulee=>{
                        console.log(req.body.filter) ;
                        res.render('admin/courses/index',{cours:cours , td:td, tp:tp , modulee:modulee}) ;
                    });
                    
                });
                
            }) ;
                
            
            
        }) ;

        }else{
            res.redirect('/login');
        }
        
    
    },
    getSearch : (req,res)=>{
        Modulee.find()
        .then(modulee=>{
            res.render('admin/courses/search',{modulee:modulee})  ;
        
        });

    },
    submitSearch : (req,res)=>{
    Cours.find({modulee:req.body.modulee})
         .then(cours=>{
             Td.find({modulee:req.body.modulee})
                 .then(td=>{
                     Tp.find({modulee:req.body.modulee})
                        .then(tp=>{
                            
                                    console.log
                                    res.render('admin/courses/search',{cours:cours,td:td,tp:tp})  ;
                                
                            
                        });
                 });
         });
    },
   
    DeleteCourse :(req,res)=>{
        user = req.session.user ;
        if(user){
      Cours.findByIdAndDelete(req.params.id)
      .then(deletedCourse=>{
        const url = host+"/admin/courses" ;
        res.redirect(url) ;
      })  ;
    }else{
        return res.redirect('/login');
    }

    },
    getInsertTd : (req,res)=>{
        user=req.session.user ; 
        if(user){
        Modulee.find().then(modulee=>{
            res.render('admin/insertModuleData/insertTd',{modulee:modulee}) ;
        }) ;
    }else{
        return res.redirect('/login');
    }
        
    },
    submitTd : (req,res)=>{
        user = req.session.user ;
        if(user){
     newtd = new Td({
        name : req.body.title, 
        modulee : req.body.modulee,
        linkk : req.body.linkk 
     });
     newtd.save().then(td=>{
        const url = host+"/admin/courses" ;
        res.redirect(url) ; 
     });
    }else{
        return res.redirect('/login');
    }
},

DeleteTd : (req,res)=>{
    user = req.session.user ;
        if(user){
    Td.findByIdAndDelete(req.params.id)
    .then(deletedtd=>{
      const url = host+"/admin/courses" ;
      res.redirect(url) ;
    })  ;
}else{
    return res.redirect('/login');
}    
},

getInsertTp : (req,res)=>{
    user=req.session.user ; 
    if(user){
    Modulee.find().then(modulee=>{
        res.render('admin/insertModuleData/insertTp',{modulee:modulee}) ;
    }) ;
}else{
    return res.redirect('/login');
}
},

submitTp : (req,res)=>{
    user = req.session.user ;
    if(user){
    newtp = new Tp({
        name : req.body.title ,
        modulee : req.body.modulee ,
        linkk : req.body.linkk ,
    }) ;
    newtp.save().then(tp=>{
        const url = host+"/admin/courses" ;
        res.redirect(url) ;
    });
}else{
    return res.redirect('/login');
}

},

DeleteTp : (req,res)=>{
    user = req.session.user ;
        if(user){
    Tp.findByIdAndDelete(req.params.id)
    .then(deletedtd=>{
      const url = host+"/admin/courses" ;
      res.redirect(url) ;
    })  ;   
}else{
    return res.redirect('/login');
} 
},

getUsers : (req,res)=>{
    user=req.session.user ; 
    if(user){
    User.find().then(users=>{
        res.render('admin/users/index',{users:users,ses:user}) ;
    }) ;
}else{
   return res.redirect('/login'); 
}
},

getProfil : (req,res)=>{
    user=req.session.user ; 
    if(user){
        profil.find().then(userr=>{
            if(userr){
                return res.render('admin/profil/index',{userr:userr,userrr:userr})
            }
            
        })
    }else{
  return res.redirect('/login');
    }
},
PostProfil : (req,res)=>{

    user = req.session.user ;
        if(user){
    // let filename = '' ;
    // let file = req.files.imagee;
  
    // filename = file.name ;
    // console.log(filename);
    
    // let uploadDir = './public' ;

    // file.mv(uploadDir+filename,(err)=>{
    //     if (err) throw err ; 
    // });
 profil.deleteMany({}).then(deleted=>{
  if(deleted){
    newProfil = new profil({
        description : req.body.description ,
        image :req.body.imageee ,
       })
       newProfil.save().then(saved=>{
          return res.redirect('/');
       })
  }  
 })
 
}else{
    return res.redirect('/login');
}

    },
    GetRsearch: (req, res) => {
        article.find().then(article => {
            res.render('admin/reaserch/index',{article:article});  
        })
        
    },
    postResearch: (req, res) => {
        new article({
            title: req.body.title,
            detail: req.body.detail,
            date: req.body.date,
            article: req.body.article
            
        }).save().then(saved => {
            const url = host+"/admin/research" ;
            res.redirect(url);
        })
    },
    getEditRes: (req, res) => {
        article.find({ _id: req.params.id })
            .then(selected => {
            res.render('admin/reaserch/edit',{article:selected}); 
        })
       
    },
    SubmitEditRes: (req, res) => {
        article.findById(req.params.id)
            .then(selected => {
                    selected.title = req.body.title;
                    selected.detail = req.body.detail;
                    selected.date = req.body.date;
                    selected.article = req.body.article;
                    selected.save().then(updated => {
                    const url = host+"/admin/research" ;
                    res.redirect(url);
                
                    })
               
                
        })
    },
    DeleteArticle: (req, res) => {
        article.findByIdAndDelete(req.params.id)
            .then(deleted => {
                const url = host+"/admin/research" ;
                res.redirect(url);
        })
    }
    

    }