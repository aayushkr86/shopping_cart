var passport_admin = require('passport')

exports.isAdminLoggedin = function (req, res, next) {    

    passport_admin.authenticate('jwt', { session: false },function(err,admin){
        //  console.log(err, admin)
        // console.log(req.user)
        if(!admin){ 

            var err = new Error('Unauthorised !!!!!!');
            err.status = 401;
            return next(err);

        }else if (admin){
            
            req.logIn(admin,function(err){
                if(err){
                    console.log("Token login error")
                }
                next();
            })          
        }
    })(req, next)   
}