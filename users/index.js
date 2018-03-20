var ControllerUsers = require('./ControllerUsers')
var UserQuery = require('./query')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerUsers(req, res, next)
}

module.exports.isuser = function (req, next, callback) {  
  request({
    url: `http://${req.headers.host}/user/is-user`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, users){ 
    //  console.log(users.body)
    callback(err, users.body.message)
  });
}

module.exports.userdetail = function (req, next, callback) {  
  request({
    url: `http://${req.headers.host}/user/user-detail`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, users){ 
    //  console.log(users.body)
    callback(err, users.body.message)
  });
}
