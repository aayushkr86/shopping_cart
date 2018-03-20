var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema

//admins schema
var AdminsSchema = new Schema({
   
  firstname: {
    type: String,
    minlength: 1,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    minlength: 5,
  },
  password: {
    type: String,
  },
  mobileno: {
    type: String
  },
  permissions:{
              category: {
                type : [String],
                enum : ['add','delete','update']
              },
              products: {
                type : [String],
                enum : ['add','delete','update']
              }
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pin: {
    type: Number,
  },
  gender: {
    type: String,
    enum:['male','female']
  },
  createdAt : {
    type: Date,
    default: Date.now
  },
  updatedAt : {
    type: Date,
  },
});

AdminsSchema.pre('save', function (next) { //console.log(this)
  var admin = this; 
  if(admin == undefined){
    next();
  }
    bcrypt.hash(admin.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    })
});

AdminsSchema.methods.validPassword = function(password) { //console.log(password)
  return bcrypt.compareSync(password, this.password);
};

var Admins = mongoose.model('admins', AdminsSchema)

module.exports = Admins;