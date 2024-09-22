const express  = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const whiteList =['http://localhost:4200']

const User = require("./router/user");
const Login = require("./router/login");
const Client = require("./router/client");

require('../app/model/associations')
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({ origin:whiteList }));

app.get('/',(req,res)=>{
    res.send('This is express')
});

app.use("/api/v1/",User);
app.use("/api/v1/",Login)
app.use("/api/v1/",Client)

module.exports = app;