var ControllerAdmins = require('./ControllerAdmins')
var AdminQuery = require('./query')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerAdmins(req, res, next)
}

module.exports.isadmin = function (req, next, callback) {  
  request({
    url: `http://${req.headers.host}/admin/is-admin`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, users){ 
    //  console.log(users.body)
    callback(err, users.body.message)
  });
}
