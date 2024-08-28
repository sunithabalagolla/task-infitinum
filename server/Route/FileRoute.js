// routes/fileRoutes.js

const express = require("express");
const FileModel = require('../Model/FileModel');
const router = express.Router();

// Route to upload multiple images
router.post("/uploadimage", async (req, res) => {
    const { Images, Description, UploaderName, UploaderId } = req.body;

    try {
        const data = new FileModel({ Images, Description, UploaderName, UploaderId });
        await data.save();
        console.log("Images API called, data saved:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to update image details
router.post("/updateimage", async (req, res) => {
    const { imageId, Images, Description, UploaderId } = req.body;

    try {
        const data = await FileModel.findByIdAndUpdate(
            imageId,
            { Images, Description }, 
            { new: true } 
        );

        if (!data) {
            return res.status(404).json({ message: "Image not found" });
        }

        console.log("Images updated successfully:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error updating data:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to get images by user ID
router.get("/getimage/:userId", async(req, res) => {
    const { userId } = req.params;
    try {
        const data = await FileModel.find({ UploaderId: userId });
        console.log("Images GET API called, data:", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Route to delete image
router.post("/deleteimage", async (req, res) => {
    console.log(req.body)
    const { imageid } = req.body;

    try {
        const data = await FileModel.findByIdAndDelete(imageid);

        if (!data) {
            return res.status(404).json({ message: "Image not found" });
        }

        console.log("Image deleted successfully:", data);
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting data:", error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
