import AWS from "aws-sdk";

// AWS S3 bucket Config
const s3Bucket = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-south-1"
});

export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>  
        s3Bucket.upload(options, (error, data) => {
            if(error){
                console.log("Error comming in upload");
                return reject(error);
            }
            return resolve(data);
        })
    );
};
