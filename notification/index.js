var ControllerNotification = require('./ControllerNotification')
var request = require('request')

module.exports = function (req, res, next) {
    ControllerNotification(req, res, next)
}

// ticket create email notification api
module.exports.ticketcreate = function (req, next, callback) {  //console.log(req.body)
    request({
      url: `http://${req.headers.host}/notification/send-ticket-create-email-notification`,
      method: 'POST',
      json: true,
      body:req.body,
      gzip: true
      }, function(err, ticket){ 
        // console.log(ticket.body)
      callback(err, ticket.body.message)
    });
  }

// ticket status change email notification api
module.exports.ticketstatus = function (req, next, callback) {  //console.log(req.body)
    request({
      url: `http://${req.headers.host}/notification/send-ticket-status-change-email-notification`,
      method: 'POST',
      json: true,
      body:req.body,
      gzip: true
      }, function(err, ticket){ 
        // console.log(ticket.body)
      callback(err, ticket.body.message)
    });
}

// forgot password email reset api
module.exports.forgotpassword = function (req, next, callback) {  //console.log(req.body)
  request({
    url: `http://${req.headers.host}/notification/forgot-password`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
    }, function(err, password){ 
      //  console.log(err,password.body)
    callback(err, password.body.message)
  });
}

// password change confirmation email 
module.exports.confirmchange = function (req, next, callback) {  //console.log(req.body)
  request({
    url: `http://${req.headers.host}/notification/confirm-password-change`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
    }, function(err, confirm){ 
      //  console.log(err,confirm.body)
    callback(err, confirm.body.message)
  });
}

// order placed email notification
module.exports.codorderPlaced = function (req, next, callback) {  //console.log(req.body)
  request({
    url: `http://${req.headers.host}/notification/cod-order-placed`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
    }, function(err, codOrder){ 
      //  console.log(err,codOrder.body)
    callback(err, codOrder.body.message)
  });
}

// order status changed email notification
module.exports.changeOrderStatus = function (req, next, callback) {  //console.log(req.body)
  request({
    url: `http://${req.headers.host}/notification/order-status-change`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
    }, function(err, orderStatus){ 
      //  console.log(err,orderStatus.body)
    callback(err, orderStatus.body.message)
  });
}