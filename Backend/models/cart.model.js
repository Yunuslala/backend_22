const mongoose=require("mongoose");
let cartSchema=mongoose.Schema({
    image:String,
    type:String,
    Brand:String,
    price:String,
    for:String,
    des:String,
    _id:String,
    userid:String,
    category:String
});
let CartModel=mongoose.model("cartData",cartSchema);

module.exports={
    CartModel
}