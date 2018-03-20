var LocalStrategy   = require('passport-local').Strategy
var passport = require('passport')
var bcrypt = require('bcrypt')
var Users = require('../models/usersmodel')
var Admins = require('../models/adminmodel')


passport.serializeUser(function(User, done) { console.log("user==>",User._id)

    Users.findById(User._id, function(err, user) { //console.log(user)
            if(user) {
                var key = {
                    type : "user",
                    id : user._id
                }
            return done(null, key);    
            }
        Admins.findById(User._id,function(err, admin) { //console.log(admin)
            if(admin) {
                var key = {
                        type : "admin",
                        id : admin._id
                    }
            return done(null, key); 
            }           
        })                        
    })    
});


passport.deserializeUser(function(key, done) { console.log("user_id==>",key)
    
    var Model = key.type === 'user' ? Users : Admins;

    Model.findById(key.id,function(err,data) { //console.log(err, data)
                     done(err, data)
                })

})







// passport signup
passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {

// console.log(req.body, email, password)
    process.nextTick(function() {

    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Minimum eight characters, at least one letter, one number and one special character')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        })
    return done(errors,messages)
    } 
    
   var query = {$or: [{ 'google.email': email },{ 'facebook.email': email }]}
   Users.findOne(query, function(err, social) { //console.log("google",social)
    if(social){
        Users.findOne({ 'local.email' :  email }, function(err, user) {
            if(user){
// console.log(user)
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }else{
                var encruptPassword =   function () { 
                                        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                                        };

                Users.findOneAndUpdate(query,{$set:{ 'local.email':email,'local.password':encruptPassword(password) }},{new: true}
                , function(err, newUser){
                    if(err){
                        return done(err)
                    }else{
                        return done(null, newUser);
                    }
                })   
            }
        
        
        })            
         
    }else {
            Users.findOne({ 'local.email' :  email }, function(err, user) {
                    // console.log(email, password);
                    //console.log(user)
                    if (err)
                        return done(err);                   
                    if (user) {
                        //return done(null,'That email is already taken.');
                        console.log('That email is already taken.')
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else { 
                        var newUser            = new Users();
                        newUser.local ={};
                        newUser.local.email    = email;
                        newUser.local.password = password;
                        newUser.save(function(err,newUser) { //console.log("err",err,"newUser",newUser)
                            if (err)
                                // throw err;
                                return done(err)
                            return done(null, newUser);
                        });
                    }

            }); 
        }
   })
       

    }); //process.nextTick

}));

// passport signin
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) { //console.log(req.body, email, password)
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:8});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(errors.msg);
        })
        return done(errors,messages)
    }    
    Users.findOne({ 'local.email' :  email }, function(err, user) { //console.log(err,user)       
        if (err) {
            return done(err);     
        }    
        else if (!user) {
             console.log('No user found')
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
        }     
        else if (!user.validPassword(password)) {
             console.log('Wrong password')
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        }        
        return done(null, user);
    });
}));

