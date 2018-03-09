var OperationalComands = require('./OperationalComands')

exports.categories = function (req, next, callback) {
  OperationalComands.categories(req, next, function (err, category) {
    callback(err, category)
  })
}


