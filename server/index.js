const express = require('express')
const cors =require('cors')
const mongoose= require('mongoose')
const bodyparser = require("body-parser");
require('dotenv').config()


const app =express()

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());





const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.json({
        message :"server runnning at " + PORT
    })
})
// mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.mr0bwxg.mongodb.net/infitinum?retryWrites=true&w=majority&appName=infitinum

mongoose.connect("mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.mr0bwxg.mongodb.net/infitinum?retryWrites=true&w=majority&appName=infitinum" , { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running at : ${PORT}`)
        console.log("Db Connected")
    })
})


// usage of routes

app.use('/auth', require('./Route/RegisterRoute'))
app.use('/file', require('./Route/FileRoute'))
app.use('/contactus', require('./Route/ContactusRoute'))








