const mongoose=require("mongoose");
const express=require("express");
const admin=express.Router();
const {ProductMenMOdel}=require("../models/product.model.men");
const {ProductgirlMOdel}=require("../models/product.model.girls")
const {ProductboysMOdel}=require("../models/product.model.boys")
const {ProductWomenMOdel}=require("../models/product.model.women");
const {adminAuthentication}=require("../middleware/admin.authentication")
const {loginModel}=require("../models/login.model");
const {men,Women,girls,boys}=require("../json");
const cors=require('cors')
admin.use(cors())
admin.use(adminAuthentication);

admin.get("/user",async(req,res)=>{
    try {
        let data=await loginModel.find()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
admin.delete("/user/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id
        await loginModel.findByIdAndDelete({_id:id});
        let data=await loginModel.find()
        res.send({"msg":"user has been deleted",data})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})

admin.post("/post/men",async(req,res)=>{
    try {
        let data=men;
        let postdata=await ProductMenMOdel.insertMany(data);
        res.send({"msg":"your all men data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/girl",async(req,res)=>{
    try {
        let data=girls;
        let postdata=await ProductgirlMOdel.insertMany(data);
        res.send({"msg":"your all men data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/boys",async(req,res)=>{
    try {
        let data=boys;
        let postdata=await ProductboysMOdel.insertMany(data);
        res.send({"msg":"your all men data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/women",async(req,res)=>{
    try {
        let data=Women;
        let postdata=await ProductWomenMOdel.insertMany(data);
        // await postdata.save();
        res.send({"msg":"your all Women data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/add/women",async(req,res)=>{
    try {
        let data=req.body;
        let postdata= ProductWomenMOdel(data);
        await postdata.save();
        let newdata=await ProductWomenMOdel.find()
        res.send({"msg":"your  Women data has been posted",newdata})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/add/Men",async(req,res)=>{
    try {
        let data=req.body;
        let postdata= ProductMenMOdel(data);
        await postdata.save();
        res.send({"msg":"your  men data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/add/boys",async(req,res)=>{
    try {
        let data=req.body;
        let postdata= ProductboysMOdel(data);
        await postdata.save();
        res.send({"msg":"your  men data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.post("/post/add/girls",async(req,res)=>{
    try {
        let data=req.body;
        let postdata= ProductgirlMOdel(data);
        await postdata.save();
        res.send({"msg":"your  kids data has been posted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.get("/get/women",async(req,res)=>{
    try {
       let data=await ProductWomenMOdel.find();
       res.send(data) 
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
admin.get("/get/men/",async(req,res)=>{
    try {
       let data=await ProductMenMOdel.find();
       res.send(data) 
    } catch (error){
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
admin.get("/get/boys/",async(req,res)=>{
    try {
       let data=await ProductboysMOdel.find();
       res.send(data) 
    } catch (error){
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})
admin.get("/get/girls/",async(req,res)=>{
    try {
       let data=await ProductgirlMOdel.find();
       res.send(data) 
    } catch (error){
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})

admin.post("/men/sort",async(req,res)=>{
    try {
        let data=await ProductMenMOdel.find(req.body);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":error})
    }
})
admin.get("/women/sort/price/",async(req,res)=>{
    try {
        console.log("object");
        if(req.query.sort=="asc"){
            var data=await ProductWomenMOdel.find();
            data.sort((a,b)=> a.price-b.price);
        }else if(req.query.sort=="desc"){
            var data=await ProductWomenMOdel.find();
            data.sort((a,b)=> b.price-a.price);
        };
        // console.log("data");
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.get("/men/sort/price/",async(req,res)=>{
    try {
        console.log("object");
        if(req.query.sort=="asc"){
            var data=await ProductMenMOdel.find();
            data.sort((a,b)=> a.price-b.price);
        }else if(req.query.sort=="desc"){
            var data=await ProductMenMOdel.find();
            data.sort((a,b)=> b.price-a.price);
        };
        // console.log("data");
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
//

// productRoute.get("/girls/shoes",async(req,res)=>{
//     try {
//         if(req.query.sort=="asc"){
//             var data=await ProductgirlMOdel.find();
//             data.sort((a,b)=> a.price-b.price);
//         }else if(req.query.sort=="desc"){
//             var data=await ProductgirlMOdel.find();
//             data.sort((a,b)=> b.price-a.price);
//         };
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.send({"msg":"something went wrong"})
//     }
// });
// productRoute.get("/Men/shoes",async(req,res)=>{
//     try {
//         if(req.query.sort=="asc"){
//             var data=await ProductMenMOdel.find(); 
//             data.sort((a,b)=> a.price-b.price);
//         }else if(req.query.sort=="desc"){
//             var data=await ProductMenMOdel.find();
//             data.sort((a,b)=> b.price-a.price);
//         };
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.send({"msg":"something went wrong"})
//     }
// });
// productRoute.get("/women/shoes",async(req,res)=>{
//     try {
//         if(req.query.sort=="asc"){
//             var data=await ProductWomenMOdel.find();
//             data.sort((a,b)=> a.price-b.price);
//         }else if(req.query.sort=="desc"){
//             var data=await ProductWomenMOdel.find();
//             data.sort((a,b)=> b.price-a.price);
//         };
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.send({"msg":"something went wrong"})
//     }
// });
//
admin.post("/women/sort",async(req,res)=>{
    try {
        let data=await ProductWomenMOdel.find(req.body);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":error})
    }
})
admin.post("/boys/sort",async(req,res)=>{
    try {
        let data=await  ProductboysMOdel.find(req.body);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":error})
    }
})
admin.post("/girls/sort",async(req,res)=>{
    try {
        let data=await ProductgirlMOdel.find(req.body);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({"msg":error})
    }
})
//delete
admin.delete("/delete/women/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        await ProductWomenMOdel.findByIdAndDelete({_id:id});
        res.send({"msg":"your  data has been deleted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.delete("/delete/men/:id",async(req,res)=>{
    try {
        let id=req.params.id;
       await ProductMenMOdel.findByIdAndDelete({_id:id});
       let data=await ProductMenMOdel.find()
        res.send({"msg":"your  data has been deleted",data})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.delete("/delete/boys/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        await  ProductboysMOdel.findByIdAndDelete({_id:id});
        res.send({"msg":"your  data has been deleted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.delete("/delete/girls/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        await ProductgirlMOdel.findByIdAndDelete({_id:id});
        res.send({"msg":"your  data has been deleted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});

//patch
admin.patch("/patch/girls/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let{price,image,type,Brand,des,Rating,category,userid}=req.body;
        let dataof={price,image,type,Brand,des,category};
        let data={}
        for(let key in dataof){
            if(dataof[key]!=""){
                data[key]=dataof[key]
            }
        }
        await ProductWomenMOdel.findByIdAndUpdate({_id:id},data);
        res.send({"msg":"your  data has been deleted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.patch("/patch/kids/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let{price,image,type,Brand,des,Rating,category,userid}=req.body;
        let dataof={price,image,type,Brand,des,category};
        let data={}
        for(let key in dataof){
            if(dataof[key]!=""){
                data[key]=dataof[key]
            }
        }
        let patchdata=await ProductWomenMOdel.findByIdAndUpdate({_id:id},data);
        // console.log(patchdata);
        res.send({"msg":"your  data has been deleted"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.patch("/patch/men/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let{price,image,type,Brand,des,Rating,category,userid}=req.body;
        let dataof={price,image,type,Brand,des,category};
        let data={}
        for(let key in dataof){
            if(dataof[key]!=""){
                data[key]=dataof[key]
            }
        }

       let patchdata= await ProductMenMOdel.findByIdAndUpdate({_id:id},data);
        console.log(patchdata);
       res.send({"msg":"your  data has been updated"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
admin.patch("/patch/women/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let{price,image,type,Brand,des,Rating,category,userid}=req.body;
        let dataof={price,image,type,Brand,des,category};
        let data={}
        for(let key in dataof){
            if(dataof[key]!=""){
                data[key]=dataof[key]
            }
        }
        let patchdata=await ProductWomenMOdel.findByIdAndUpdate({_id:id},data);
        console.log(patchdata);
        res.send({"msg":"your  data has been Updated"})
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
});
module.exports={
    admin
}