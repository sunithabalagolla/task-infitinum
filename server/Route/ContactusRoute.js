const express = require ('express')
const Contactmodel = require('../Model/ContactUsModel')
const nodemailer = require("nodemailer");
require('dotenv').config()

const router = express.Router();

// email config
const tarnsporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: 'scsm mgis azzn dhqi'
    }
})

router.post("/contactus", async (req, res)=>{
    const {Name, Email,Subject,Message}=req.body
    console.log(req.body)

    try {
        const data = new Contactmodel({Name, Email,Subject,Message})
        await data.save();
        res.status(200).json(data);
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: Email,
            subject: "SS Photography",
            text: `Thanks You For Choosing Us ${Name},
            We Will Contact you soon `
        }

        tarnsporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                res.status(400).json({ error: "email not send" })
            } else {
                console.log("Email sent", info.response);
                // res.status(200).json({ message: "Email sent Successfully" })
            }
        })

    } catch (error) {
        res.status(500).json({message:error})
    }
})

router.get("/getcontact",async (req,res)=>{
    try {
        const data = await Contactmodel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error})
    }
})

module.exports = router