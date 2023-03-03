const express=require("express");
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
const morgan=require("morgan");
const path=require("path");
const { dirname } = require("path");
const { title } = require("process");

const connectDB=require('./server/database/connection');

const app=express();

dotenv.config({path:`config.env`});

const PORT=process.env.PORT || 8080


//log request
//app.use(morgan(`tiny`));

//mongodb connection
connectDB();


//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));

//setview engine

app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"));


//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load routers module in app
app.use('/',require('./server/routes/router'));


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT} `);
})