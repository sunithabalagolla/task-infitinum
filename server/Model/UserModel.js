const mangoose = require("mongoose")

const userSchema = new mangoose.Schema({
    
    email :{
        type: String,
        required :[true, " provide email"],
        unique :true
    },
    username: {
        type : String,
        required:[true, "provide Username"]

    },
    
    password :{
        type: String,
        required :[true, " provide password"],
        
    },
    
}
,{
    timestamps :true
}
)

const UserModel =mangoose.model('UserModel', userSchema)

module.exports = UserModel;

