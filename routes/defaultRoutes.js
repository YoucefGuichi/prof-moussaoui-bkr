const express = require('express') ;
const router = express.Router() ;
const defaultControllers = require('../controllers/defaultControllers') ;
const passport = require('passport') ;
const localStrategy = require('passport-local').Strategy ;
const bcrypt = require('bcrypt') ;

router.all('/*', (req, res, next) => {
    
    req.app.locals.layout = 'default';
    
    next();
});



router.route('/')
  .get(defaultControllers.index) ;

router.route('/Contact')
 .get(defaultControllers.contact)
 .post(defaultControllers.submitmessage);

router.route('/courses')
 .get(defaultControllers.getCourses) ;
router.route('/courses/:id')
  .get(defaultControllers.GetSelecCourses);

router.route('/research')
  .get(defaultControllers.GetResearch); 
router.route('/register')  
  .get(defaultControllers.getRegister) 
  .post(defaultControllers.postRegister) ;

router.route('/login')
.get(defaultControllers.getLogin)
.post(defaultControllers.postLogin);

router.route("/log")
.get(defaultControllers.GetLogout);

router.route('/Marks')
  .get(defaultControllers.GetMarks);

module.exports = router ;