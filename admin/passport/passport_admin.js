var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport_admin = require('passport')
var LocalStrategy   = require('passport-local').Strategy
var Admins = require('../../models/adminmodel')


// passport_admin.serializeUser(function(user, done) { console.log("admin==>",user)
//     // console.log(user)
//     done(null, user.id);
// });
// passport_admin.deserializeUser(function(id, done) { console.log("admin_id==>",id)
//     Admins.findById(id, function(err, user) { //console.log(user)
//         done(err, user);
//     });
// })
var JwtBearerStrategy = require('passport-http-bearer')

var options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey    : 'secret',
    // issuer         : 'accounts.examplesoft.com',
    // audience       : 'yoursite.net'
}

passport_admin.use('jwt', new JwtStrategy(options, function(jwt_payload, done) { //console.log(jwt_payload)

    Admins.findById(jwt_payload._id, function(err, admin) { //console.log(err,admin)
        if (err) {
            return done(err, false);
        }
        else if (!admin) {
            return done(null, false);
        } else {
            return done(null, admin);
           
        }
    });
}));











// passport signup
passport_admin.use('admin-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {

 //console.log(req.body, email, password)
    process.nextTick(function() {

    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Minimum eight characters, at least one letter, one number and one special character')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        })
    return done(errors,messages)
    } 
    Admins.findOne({ 'email' :  email }, function(err, admin) {
            if(admin) {
            console.log('That email is already taken.')
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }else {
                var newAdmin      = new Admins();
                newAdmin.email    = email;
                newAdmin.password = password;
                newAdmin.save(function(err,newadmin) { //console.log("err",err,"newAdmin",newAdmin)
                    if (err) { 
                        return done(err)
                    }  
                    //  req.login(newadmin,function(admin){ console.log(admin)
                         return done(null, newadmin);
                    //  })                      
                    
                });
    
            }
               
        })            
       
    }); //process.nextTick

}));

var jwt = require('jsonwebtoken');
// passport signin
passport_admin.use('admin-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) { 
    //console.log(req.body, email, password)
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:8});
    var errors = req.validationErrors();
    if(errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(errors.msg);
        })
        return done(errors,messages)
    }    
    Admins.findOne({ 'email' :  email }, function(err, admin) { 
        //  console.log(err,admin)       
        if (err) {
            return done(err);     
        }    
        else if (!admin) {
             console.log('No user found')
            return done(null, false, req.flash('loginMessage', 'No user found.')); 
        }     
        else if (!admin.validPassword(password)) {     
             console.log('Wrong password')
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        }        

        // req.logIn(admin, function(err) {
            // if (err) 
            // return done(err, "error")
            // var secretOrKey = jwtOptions.secretOrKey;
            // var secretOrKey = "secret"
            // var token = jwt.sign(admin.toJSON(), secretOrKey, {
            //     expiresIn: 631139040 // 20 years in seconds
            // });
            // res.send({ admin: admin, jwtToken: "JWT " + token });
            // console.log(token)
        //    return done(false, { admin: admin, jwtToken: "JWT " + token })
        // });

        return done(false, admin);
    });
}));




