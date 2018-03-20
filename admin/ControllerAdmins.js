var express = require('express')
var router = express.Router()
var passport_admin = require('passport')
var jwt = require('jsonwebtoken');
var MainAdmins = require('./MainAdmins')
var adminvalidator = require('../admin/passport/passportlogin_validator')

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
router.get('/user-list', adminvalidator.isAdminLoggedin, function (req, res, next) {
  MainAdmins.getallusers(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//update profile api
router.post('/update-profile', adminvalidator.isAdminLoggedin, function (req, res, next) {       
  MainAdmins.updateuser(req, next, function (err, data) { // console.log(err, data)
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err) {
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


// passport login
router.post('/admin-passport-login', function(req, res, next) {
  MainAdmins.logintoken(req, next, function (err, data) {     
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
}); 

 
router.get('/profile', adminvalidator.isAdminLoggedin,
// passport_admin.authenticate('jwt', { session: false }),
    function(req, res) { //console.log(req.user)
        res.send(req.user);
    }
);

//==============================================filters==========================================================//

router.post('/filters', adminvalidator.isAdminLoggedin, function(req, res, next) {
  MainAdmins.filters(req, next, function (err, data) {     
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
}); 


//==============================================filters==========================================================//