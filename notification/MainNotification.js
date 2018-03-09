var OperationalComands = require('./OperationalComands')

exports.ticketcreate = function (req, next, callback) {
  OperationalComands.ticketcreate(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.ticketstatus = function (req, next, callback) {
  OperationalComands.ticketstatus(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.forgotpassword = function (req, next, callback) {
  OperationalComands.forgotpassword(req, next, function (err, password) {
    callback(err, password)
  })
}

exports.confirmchange = function (req, next, callback) {
  OperationalComands.confirmchange(req, next, function (err, confirm) {
    callback(err, confirm)
  })
}