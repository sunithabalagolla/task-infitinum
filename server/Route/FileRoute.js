const express =require("express");
const FileModel = require('../Model/FileModel')



const router =express.Router();


router.post("/uploadimage", async (req, res) => {
    console.log(req.body); // Log the body for debugging
    const { Image, Description } = req.body;

    try {
        const data = new FileModel({ Image, Description });
        await data.save();
        res.status(200).json(data);
        console.log("image api called");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/getimage", async(req, res)=>{
    try {
        const data = await FileModel.find()
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