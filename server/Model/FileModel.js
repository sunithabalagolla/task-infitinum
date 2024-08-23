const mangoose = require("mongoose")

const FileSchema = new mangoose.Schema({
    
    Image :{
        type: String,
        
    },
    Description: {
        type : String,
        

    }
}
,{
    timestamps :true
}
)

const FileModel = mangoose.model('photogrphyImages', FileSchema)

module.exports = FileModel;

