const mangoose = require("mongoose")

const FileSchema = new mangoose.Schema({
    
    Image :{
        type: String,
        
    },
    Description: {
        type : String,
    },
    UploaderName:{
        type: String
    },
    UploaderId:{
        type: String
    }
}
,{
    timestamps :true
}
)

const FileModel = mangoose.model('photogrphyImages', FileSchema)

module.exports = FileModel;

