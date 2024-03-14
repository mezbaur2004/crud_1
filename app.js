const express=require('express');
const router=require('./src/route/api');
const app=new express();
const bodyParser=require('body-parser');


//Security Middleware

const limiter=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');

//Database Lib Import
const mongoose=require('mongoose');


//Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit

const rateLimiter=limiter({windowMs:15*60*1000,max:1000});
app.use(rateLimiter);


//MongoDB database connection

let URL="mongodb://localhost:27017/ToDo";
let OPTION={user:"",pass:"",autoIndex:true};
mongoose.connect(URL,OPTION).then((res)=>{
    console.log(`Database Connected`)
}).catch((err)=>{
    console.log(err);
})

//Route Implement

app.use('/api',router)

//if api not found

app.use("*",(req,res)=>{
    res.status(404).json({data:"Not Found"})
})

module.exports=app;
