const express =require("express");
const FileModel = require('../Model/FileModel')



const router =express.Router();


router.post("/uploadimage", async (req, res) => {
    console.log(req.body); 
    const { Image, Description,UploaderName,UploaderId } = req.body;

    try {
        const data = new FileModel({ Image, Description,UploaderName,UploaderId});
        await data.save();
        res.status(200).json(data);
        console.log("image api called");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/updateimage", async (req, res) => {
    console.log(req.body); 
    const { imageId, Image, Description,UploaderId } = req.body;

    try {
        const data = await FileModel.findByIdAndUpdate(
            imageId,
            { Image, Description }, 
            { new: true } 
        );

        if (!data) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json(data);
        console.log("Image updated successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/getimage/:userId", async(req, res)=>{
    const{userId}=req.params
    try {
        const data = await FileModel.find({UploaderId:userId})
        res.status(200).json(data);
        console.log("image get api called");
    } catch (error) {
        
    }
})

router.post("/deleteimage", async (req, res) => {
    const { imageid } = req.body;
    console.log(imageid)
    
    try {
       
        const data = await FileModel.findByIdAndDelete(imageid);

        if (!data) {
            
            return res.status(404).json({ message: "Image not found" });
        }

        
        res.status(200).json({ message: "Image deleted successfully" });

    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


module.exports =router