const mongoose=require("mongoose");
const LoginSchema=mongoose.Schema({
    fname:{type:String, require:true},
    lname:{type:String, require:true},
    Dob:{type:String, require:true},
    email:{type:String, require:true},
    pass:{type:String, require:true},
});

const loginModel=mongoose.model("loginuser",LoginSchema);

module.exports={
    loginModel
}