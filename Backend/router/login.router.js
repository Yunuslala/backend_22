const express=require("express");
const loginRoute=express.Router();
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
const {loginModel}=require("../models/login.model");
const {authentication}=require("../middleware/user.authentication")
const cors=require('cors')
loginRoute.use(cors())
loginRoute.post("/signup",async(req,res)=>{
    try {
        let {fname,lname,Dob,email,pass}=req.body;
        let reqData=await loginModel.find({email});
        if(reqData.length>0){
            res.send({"msg":"your email has beeen alredy registered"});
        }else{
            bcrypt.hash(pass,6,async(err,hash)=>{
                if(err){
                    console.log(err);
                    res.send({"msg":err})
                }else{
                    let signupdata=loginModel({fname,lname,email,Dob,pass:hash});
                    await signupdata.save();
                    res.send({"msg":"you have been signed Up"})
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
// loginRoute.use(authentication)
loginRoute.post("/login",async(req,res)=>{
    try {
        let {email,pass}=req.body
        let registeredData=await loginModel.find({email});
        if(registeredData.length>0){
            console.log(registeredData);
            bcrypt.compare(pass, registeredData[0].pass, function(err, result) {
                if(result){
                    var dataid=registeredData[0]._id;
                    var name=registeredData[0].fname;
                    console.log(name,dataid);
                    var token=jwt.sign({dataid,name},'aquos');
                    res.send({"msg":"You have been logged in",token,name,staus:true})
                }else{
                    console.log(err);
                    res.send({"msg":"wrong password please enter correct password",staus:false})
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});


module.exports={
loginRoute
}