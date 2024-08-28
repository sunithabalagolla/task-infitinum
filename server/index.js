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

mongoose.connect("mongodb+srv://sureshpyla2000:suresh123@chatvia-db.qvrm4e1.mongodb.net/?retryWrites=true&w=majority&appName=chatvia-db" , { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server running at : ${PORT}`)
        console.log("Db Connected")
    })
})


// usage of routes

app.use('/auth', require('./Route/RegisterRoute'))
app.use('/file', require('./Route/FileRoute'))
app.use('/contactus', require('./Route/ContactusRoute'))








