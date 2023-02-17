const jwt=require('jsonwebtoken');
const adminAuthentication=(req,res,next)=>{
    var token=req.headers.authorization;
    console.log(token);
    console.log("object");
    var decoded=jwt.verify(token,'aquos');
    if(decoded&& decoded.name=="admin"){
        req.body.userid=decoded.dataid;
        next()
    }else{
        res.send({"msg":"you are not admin"});
    }
};
module.exports={
    adminAuthentication
}
