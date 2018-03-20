var express = require('express')
var router = express.Router()
var MainNotification = require('./MainNotification')

module.exports = router

// response handler
function response (res,statuscode,err,data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400) {
    if(data == []) {
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// send ticket create email notification
router.post('/send-ticket-create-email-notification', function (req, res, next) {
  MainNotification.ticketcreate(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// send ticket status change email notification
router.post('/send-ticket-status-change-email-notification', function (req, res, next) {
  MainNotification.ticketstatus(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})


//password reset instructions
router.post('/forgot-password', function (req, res, next) {
  MainNotification.forgotpassword(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//password change confirmation
router.post('/confirm-password-change', function (req, res, next) {
  MainNotification.confirmchange(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// cod order placed email notification
router.post('/cod-order-placed', function (req, res, next) {
  MainNotification.codorderPlaced(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// cod order placed email notification
router.post('/order-status-change', function (req, res, next) {
  MainNotification.changeOrderStatus(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})