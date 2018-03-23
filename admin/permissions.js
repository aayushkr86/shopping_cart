var OperationalComands = require('./OperationalComands')

//permission checks
module.exports = { 

    adminAddPermission : function (req, res, next) { 
        OperationalComands.adminAddPermission(req, next, function (err, permission) {  //console.log(err, permission)
          if(err) {
            var err = new Error(permission);
                err.status = 401;
                return next(err);
          }else {
            next();
          }
        })
    }
  
}