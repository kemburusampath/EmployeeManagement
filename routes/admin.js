const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Employee = require('../models/employee');
const HR = require('../models/hr');
var generator = require('generate-password');
var nodemailer = require('nodemailer');

// var password = generator.generate({
//   length:6,
//   numbers:true
// })


//adding user

router.post('/register',function(req,res,next){
  var newuser = new User();
  newuser.userid =req.body.userid;
  newuser.password =req.body.password;
  newuser.role =req.body.role;
  
  
  var roleUser;
  if(newuser.role=="employee")
  {
    roleUser = new Employee();
    roleUser.role = req.body.role;
    roleUser.name = req.body.name;
    roleUser.email = req.body.email;
    roleUser.department = req.body.department;
    roleUser.userid =req.body.userid;
    roleUser.password =req.body.password;
    User.addUser(newuser, function(err,user){
      if(err){
        res.json({success:false , msg:"UserID Already Exist in users."});
      }else{
        Employee.addUser(roleUser,function(err,user){
          if(err){
            res.json({success:false , msg:"add employee failed."});
          }else{
            res.json({success:true , msg:"success in add employee"});
          }
        });
      }
    });
  }
  else if(newuser.role=='hr'){
    roleUser = new HR();
    roleUser.userid =req.body.userid;
    roleUser.password =req.body.password;
    roleUser.role = req.body.role;
    roleUser.name = req.body.name;
    roleUser.email = req.body.email;
    roleUser.department = req.body.department;
    User.addUser(newuser, function(err,user){
      if(err){
        console.log(err);
        res.json({success:false , msg:"UserID Already Exist in users."});
      }
      else{
        HR.addUser(roleUser,function(err,user){
          if(err){
            res.json({success:false , msg:"add employee failed."});
          }else{
            res.json({success:true , msg:"success in add employee"});
          }
        });
      }
    });

    // mail sending ...

var transporter=nodemailer.createTransport({
  service: 'gmail',

  auth: {
      user:'sampathkumar.ksk528@gmail.com',
      pass:'Sampathkumar@528'
  }
});

var mailOption={
  from: 'sampathkumar.ksk528@gmail.com',
  to: req.body.email,
  subject: 'From MSS office',
  text: req.body.password
};

transporter.sendMail(mailOption, function(error,info){
  if(error){
    console.log(error);
  }
  else{
    console.log('Email sent: '+info.response);
  }
});

   
  }
});


//delete

    router.post('/delete',function(req,res,next){
      var userid =req.body.userid;
      User.getUserByUserId(userid,function(err,user){
        if(err) throw err;
        if(!user){
          return res.json({success:false,msg:"user not found."});
        }
        else{
          // User.deleteOne({ userid: req.body.userid});
          if(user.role=='employee'){
                Employee.deleteOne({userid:req.body.userid},function(err,data){
                  if(err) throw err;
                  else{
                  // return res.json({success:true,msg:"deleted"});
                  User.deleteOne({userid:req.body.userid},function(err,body){
                    if(err) throw err;
                    else
                    return res.json({success:true,msg:"deleted"});
                  });
                  }
                });
               
              }
              else if(user.role=='hr'){
                HR.deleteOne({userid:req.body.userid},function(err,data){
                  if(err) throw err;
                  else{
                  // return res.json({success:true,msg:"deleted"});
                  User.deleteOne({userid:req.body.userid},function(err,body){
                    if(err) throw err;
                    else
                    return res.json({success:true,msg:"deleted"});
                  });
                  }
                });
               
              }
            
            }
      });
          });
//update


module.exports = router;