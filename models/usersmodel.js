var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema
require('mongoose-type-email')

// Google Schema
var UsersGoogleSchema = new Schema({  
  id: {
    type: String
  },
  displayName: {
    type: String
  },
  firstname: {
    type: String,
    maxlength: 15,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  photos: {
    type: String,
  },
  gender: {
    type: String,
    enum:['male','female']
  },
  token: {
    type: String
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    default : 'google',
    enum: ['google']
  },
})

//Facebook schema
var UsersFbSchema = new Schema({  
  id: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    minlength: 5,
    maxlength: 30,
  },
  photos: {
    type: String,
  },
  gender: {
    type: String,
    enum:['male','female']
  },
  token: {
    type: String
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    default : 'facebook',
    enum:['facebook']
  }
})

//local schema
var UsersLocalSchema = new Schema({  
  email: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  password: {
    type: String,
    maxlength: 15,
    validate: {
      validator: function (v) { 
        //Minimum eight characters, at least one letter, one number and one special character:
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/.test(v) 
      },
      message: 'Not a valid password!'
    }
  },  
  createdAt : {
    type: Date,
    default: Date.now
  },
})

//user schema
var UsersSchema = new Schema({
   
  local  : UsersLocalSchema,
  google : UsersGoogleSchema,
  facebook : UsersFbSchema,

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
    maxlength: 20,
  },
  mobileno: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v)
      },
      message: '{VALUE} is not a valid mobile number!'
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
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

UsersSchema.pre('save', function (next) {
  var user = this; 
  if(user.local == undefined){
    next();
  }
    bcrypt.hash(user.local.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.local.password = hash;
      next();
    })
});

UsersSchema.methods.validPassword = function(password) { //console.log(password)
  return bcrypt.compareSync(password, this.local.password);
};

var Users          = mongoose.model('users', UsersSchema,'users')
var Users_local    = mongoose.model('users_local', UsersLocalSchema,'users')
var Users_google   = mongoose.model('users_google', UsersGoogleSchema,'users')
var Users_facebook = mongoose.model('users_facebook', UsersFbSchema,'users')

module.exports = Users;