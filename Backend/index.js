const express=require("express");
const{connection}=require("./db");
const {productRoute}=require("./router/produt.router");
const {admin}=require("./router/admin.router");
const {loginRoute}=require("./router/login.router")
const app=express();
app.use(express.json())
app.use(loginRoute)
app.use(productRoute);
app.use(admin)






app.listen("4500",async()=>{
    try {
        await connection;
        console.log("db is connected");
    } catch (error) {
        console.log(error);
        console.log("db is not connected");
    }
    console.log("http://localhost:4500");
})