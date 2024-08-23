const mongoose = require('mongoose')

const ContactUsSchema = mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Subject:{
        type:String
    },
    Message:{
        type:String
    }

}
,{
    timestamps :true
}
)

const Contactmodel = mongoose.model("ContactModel", ContactUsSchema)

module.exports = Contactmodel