// Model/FileModel.js

const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    Images: [{
        type: String, 
        required: true  
    }],
    Description: {
        type: String,
        required: true  
    },
    UploaderName: {
        type: String,
        required: true  
    },
    UploaderId: {
        type: String,
        required: true  
    }
}, {
    timestamps: true
});

const FileModel = mongoose.model('PhotographyImages', FileSchema);

module.exports = FileModel;
