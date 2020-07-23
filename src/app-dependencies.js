const express = require("express");
const bodyParser = require("body-parser");
const request = require("https");
const querystring = require("querystring");
const checkAuth = require("../middleware/auth/checkAuth");
const signAuth = require("../middleware/auth/signAuth");
const cors = require("cors");
const Ddos = require('ddos');
const mongoose=require('mongoose');
const mbuilder=require('../MongoDB/mongooseBuilder');

//INSERT DEPENDENCIES HERE
//DDOs settings
const ddos = new Ddos({burst:10, limit:15})

module.exports={express:express,bodyParser:bodyParser,request:request,querystring:querystring,checkAuth:checkAuth,signAuth:signAuth,cors:cors,ddos:ddos,mongoose:mongoose,mbuilder:mbuilder};