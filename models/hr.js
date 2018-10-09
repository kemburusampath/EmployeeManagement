const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// HR Schema
const HRSchema = mongoose.Schema({
  name: {
    type: String    
  },
  email: {
    type: String
    // required: true
  },
  userid: {
    type: String,
    index: { unique: true }
    // required: true
  },
  password: {
    type: String
    // required: true
  },
  role:{
    type:String
    // required:true
  },
  department:{
    type:String
    // required:true
  },
  phnum:{
    type:Number
  },
  address:{
    type:String
  }
});

const HR = module.exports = mongoose.model('HR', HRSchema);
module.exports.getHRById = function(id, callback){
  HR.findById(id, callback);
}

module.exports.getHRByUserId = function(userid, callback){
  const query = {userid: userid}
  HR.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      console.log(newUser);
      // console.log(newUser.password);
      // console.log(newUser.username);
      newUser.save(callback);
    });
  });
}
