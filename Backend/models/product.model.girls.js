const mongoose=require("mongoose");
const ProductSchema=mongoose.Schema({
    image:{type:String, require:true},
    type:{type:String, require:true},
    Brand:{type:String, require:true},
    price:{type:String, require:true},
    For:{type:String, require:true},
    des:{type:String, require:true},
    category:{type:String, require:true}
  
});

const ProductgirlMOdel=mongoose.model("Productofgirl",ProductSchema);

module.exports={
    ProductgirlMOdel
}