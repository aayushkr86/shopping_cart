var ControllerCart = require('./ControllerCart')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerCart(req, res, next)
}
