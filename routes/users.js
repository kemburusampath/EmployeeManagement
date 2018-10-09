const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Employee = require('../models/employee');
const HR = require('../models/hr');
const Status=require('../models/status')
var empSchema = Employee.Employee;

//login

router.post('/authenticate', function(req, res, next) {
  var userid = req.body.userid;
  var password = req.body.password;
  var token;
  User.getUserByUserId(userid,function(err,user){
    if(err) throw err;
    if(!user){
      return res.json({success:false,msg:"user not found."});
    }
    User.compareUserPassword(password,user.password,function(err,ismatch){
      if(err) throw err;
      if(ismatch){
        //code to get profile
        if(user.role=='employee'){
          Employee.getEmployeeByUserId(userid,function(err,userdata){
            if(err) throw err;
            if(!userdata){
              return res.json({success: false,msg:"employee not found."});
            }else{
              token = jwt.sign(userdata.toObject(), config.secret, {expiresIn: 3600 });
              return res.json({success:true,msg:"employee login success.",token: "Bearer "+token,user:userdata});
            }
          });
        }
        else if(user.role=='hr'){
          HR.getHRByUserId(userid,function(err,userdata){
            if(err) throw err;
            if(!userdata){
              return res.json({success: false,msg:"HR not found."});
            }else{
              token = jwt.sign(userdata.toObject(), config.secret, {expiresIn: 3600 });
              return res.json({success:true,msg:"HR login success.",token: "Bearer "+token,user:userdata});
            }
          });
        }
        
        else if(user.role=='admin'){
          token = jwt.sign(user.toObject(), config.secret, {expiresIn: 3600 });
          return res.json({success:true,msg:"Admin login success.",token: "Bearer "+token,user:user});
        }
        else{
          return res.json({success: false,msg:"unknown role found"});
        }
        
      }else{
        return res.json({success:false,msg:"wrong password."});
      }
    });
  });
});

// Profile
router.get('/profile/:userid', function(req, res, next) {
  var userid=req.params.userid;
  User.getUserByUserId(req.params.userid,function(err,user){
    if(err) throw err;
    if(!user){
      return res.json({success:false,msg:"user not found."});
    }
    else  if(user.role=='employee'){
          Employee.getEmployeeByUserId(userid,function(err,userdata){
            if(err) throw err;
            if(!userdata){
              return res.json({success: false,msg:"employee not found."});
            }else{
              return res.json({success:true,user:userdata});
            }
          });
        }
        else if(user.role=='hr'){
          HR.getHRByUserId(userid,function(err,userdata){
            if(err) throw err;
            if(!userdata){
              return res.json({success: false,msg:"HR not found."});
            }else{
              return res.json({success:true,user:userdata});
            }
          });
        }
        
        else if(user.role=='admin'){
          return res.json({success:true,user:user});
        }
        else{
          return res.json({success: false,msg:"unknown role found"});
        }
 });
});


//edit
router.post('/edit',function(req,res,next){
  var userid =req.body.userid;
  User.getUserByUserId(userid,function(err,user){
    if(err) throw err;
    if(!user){
      return res.json({success:false,msg:"user not found."});
    }
    else{
      if(user.role=='employee'){
        Employee.update({userid:req.body.userid},
          {
            name:req.body.name, 
            email:req.body.email,
            phnum:req.body.phnum,
            address:req.body.address
          },
          function(err,result){
            if(err){
              res.json(err);}
            else if(result.n==1){
              res.json({success:true,msg:"Updated"}); 
            }
            else{
              res.json({success:false,msg:json.stringify(result)});
            }
          });
      }
      else if(user.role=="hr")
      {
        HR.update({userid:req.body.userid},
          {
            name:req.body.name, 
            email:req.body.email,
            phnum:req.body.phnum,
            address:req.body.address
          },
          function(err,result){
            if(err){
              res.json(err);}
            else if(result.n==1){
              res.json({success:true,msg:"Updated"}); 
            }else{
              res.json({success:false,msg:json.stringify(result)});
            }
          });
      }
    }
  });
});


// router.post('/empsearch',(req,res)=>
// {
//   var name = req.body.name;
//   empSchema.find({'name':name},(err,result)=>
// {
//   if(err)
//   {
//     res.send(err)
//   }
//   else
//   {
//     res.json(result)
//   }
// })
// })


//status
router.post('/status',function(req,res,next){
  var status = new Status();
  status.userid=req.body.userid;
  status.department=req.body.department;
  status.date=req.body.date;
  status.time=req.body.time;
  status.title=req.body.title;
  status.status=req.body.status;
  console.log(status);
    status.save(function(err,result){
      if(err)
      {
        console.log(result);
        res.json({"error":err});
        }
      else{
        console.log(" posted successfully...");
        res.json({msg:"posted successfully",result:result});
    }
  });

  
});
router.get('/gettingstatus',function(req,res){
Status.find(function(err,status){
if(err)
return res.json({"error":err});
else
{
  return res.json(status)
  
}
})
})



module.exports = router;
