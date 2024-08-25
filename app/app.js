const express  = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();

const User = require("./router/user");

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('This is express')
});

app.use("/api/v1/",User)
module.exports = app;