var express = require('express')
var router = express.Router()
var passport_admin = require('passport')
var jwt = require('jsonwebtoken');
var MainAdmins = require('./MainAdmins')
var passloginvalidator = require('../passport/pass_loginvalidator')


module.exports = router

// response handler
function response (res,statuscode,err,data) { //console.log(statuscode,err,data)
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){ 
    if(data == [] || data.length == 0){
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// user list api
router.get('/user-list', function (req, res, next) {
  MainAdmins.getallusers(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//update profile api
router.post('/update-profile',function (req, res, next) {       
  MainAdmins.updateuser(req, next, function (err, data) { // console.log(err, data)
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err){
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })  
})

// current profile api (after registering)
router.get('/profile', passloginvalidator.isLoggedIn, 
function (req, res, next) { 
  // console.log(req.body)    
  MainAdmins.profileview(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err){
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

//logout api
router.get('/admin-passport-logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// check if user exists
router.post('/is-user', function (req, res, next) { 
  MainAdmins.isuser(req, next, function (err, data) {     
    if (err) { console.log(err)
      response(res, 400, err, {})
    } else if (data == null) {
      data = "no user found"
      response(res, 400, null, data)
    } else { 
      response(res, 200, null, data)
    }
  })
})


//local signup api
router.post('/admin-passport-signup', passport_admin.authenticate('admin-signup', {
  successRedirect : '/admin/profile',
  failureRedirect : '/', 
  failureFlash : true 
}));

// //local login api
// router.post('/admin-passport-login', 
//   function(req, res, next){
//   passport_admin.authenticate('admin-login',function(err,user,info) {

//   // console.log(err,user,info)
//   response(res, 200, null,  user )

//   // successRedirect : '/admin/profile', 
//   // failureRedirect : '/', 
//   // failureFlash : true 
//   })(req,res,next);
// })

router.post('/admin-passport-login', function(req, res, next){
  MainAdmins.logintoken(req, next, function (err, data) {     
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err){
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
}); 


// admin auth check
router.post('/profile', passport_admin.authenticate('jwt', { session: false }),
    function(req, res) { console.log(req.user)
        res.send(req.user.profile);
    }
);

