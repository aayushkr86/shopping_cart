var express = require('express')
var router = express.Router()
var MainProducts = require('./MainProducts')
var multer = require('multer');

var storage = multer.diskStorage({ 
    destination : function(req,file,callback){  console.log(req.body)
                    callback(null,'./uploads/');
    },
    filename: function(req,file,callback){
                callback(null,new Date().toISOString() +'-'+ file.originalname)
    }
});
var fileFilter = function(req,file,callback){  console.log(req.body)
                if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif'){
                    callback(null,true);
                }else{
                    callback("not a image file",false);
                }
}
var upload = multer({
  storage: storage,
  limits:{
    fileSize :1024 * 1024 * 5 //5mb
  },
  fileFilter: fileFilter
});

module.exports = router

// response handler
function response (res,statuscode,err,data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){
    if(data == [] || data.length == 0){
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// form-data problem
// router.use('/pic-upload', function(req, res, next){ console.log(req.file);console.log(req.body)
//   if(req.body._id){
//     next()
//   }
//   else {
//     data = "_id is required"
//     response(res, 400, null, data)
//   }    
// })

router.post('/pic-upload', upload.single('pic'), function (req, res, next) {  //console.log(req.file);console.log(req.body)
  MainProducts.picupload(req, next, function (err, data) { //console.log(err,data)
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

router.post('/add-products', function (req, res, next) {  
  MainProducts.addproducts(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

router.get('/all-products', function (req, res, next) {  
  MainProducts.allproducts(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

router.post('/is-product', function (req, res, next) {  
  MainProducts.isproduct(req, next, function (err, data) { //console.log(err,data)
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

