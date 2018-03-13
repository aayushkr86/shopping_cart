var express = require('express')
var router = express.Router()
var passloginvalidator = require('../passport/pass_loginvalidator')
var users = require('../users/index')
var tickets = require('../tickets/index')
var notification = require('../notification/index')
var products = require('../products/index')
var cart = require('../cart/index')
var coupons = require('../coupons/index')
var category = require('../category/index')


module.exports = router

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/user', users)                                      // user microservice
router.use('/tickets',passloginvalidator.isLoggedIn, tickets)   // tickets microservice
router.use('/notification', notification)                       // notification microservice
router.use('/products', products)                               // product microservice
router.use('/cart', cart)                                       // cart/order microservice
router.use('/coupons', coupons)                                 // coupons microservice
router.use('/category', category)                               // category microservice


// error handler
router.use(function (err, req, res, next) {
  console.log('error:', err) ;
  res.status(err.status || 422).send({'error': err.message ||err})
})
