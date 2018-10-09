const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// employee Schema
const EmployeeSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
    // required: true
  },
  userid: {
    type: String,
    // required: true
    index: { unique: true }
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

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.getEmployeeById = function(id, callback){
  Employee.findById(id, callback);
}

module.exports.getEmployeeByUserId = function(userid, callback){
  const query = {userid: userid}
  Employee.findOne(query, callback);
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
