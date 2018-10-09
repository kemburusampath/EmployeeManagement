const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const statusSchema = mongoose.Schema({
    userid: {
        type: String
      },
      department:{
          type:String
      },
      date:{
          type:String
      },
      time:{
          type:String
      },
      title:{
          type:String
      },
      status:{
          type:String
      }
});


const status = module.exports = mongoose.model("status",statusSchema);
