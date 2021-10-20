import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

// Database Model
import {ImageModel} from "../../database/allModels";

// Utilites
import { s3Upload } from "../../Utils/AWS/s3";

const Router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({storage});


// // AWS S3 bucket Config
// const s3Bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_KEY,
//     region: "ap-south-1"
// });



/*
Route:        /
Des:          Uploading Given Image to S3 Bucket, and then saving the file to mongodb
Param:        None
Access:       Public
Method:       POST
*/

Router.post("/", upload.single("file") ,async(req, res) => {
    try{
        const file = req.file;
        // S3 Bucket options
        const bucketOptions = {
            Bucket: "personalfoodorder",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.json({uploadImage: uploadImage});

    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;