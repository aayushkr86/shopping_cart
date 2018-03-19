var ControllerProducts = require('./ControllerProducts')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerProducts(req, res, next)
}

module.exports.isproduct = function (req, next, callback) {  //console.log(`${req.headers.host}`) 
  request({
    url: `http://${req.headers.host}/products/is-product`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, product){ 
    //  console.log(product.body)
    callback(err, product.body.message)
  });
}