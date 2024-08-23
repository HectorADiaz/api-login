const express  = require('express');
const morgan =require("morgan");
const app = express();

const User = require("./router/user");

app.use(morgan("dev"));


app.get('/',(req,res)=>{
    res.send('This is express')
});

app.use("/api/v1/",User)
module.exports = app;