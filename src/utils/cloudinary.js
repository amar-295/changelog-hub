import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }); 

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null;
            // Upload the file on Cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
            });

            // File has been uploaded successfully
            console.log("File is uploaded on cloudinary", response.url);

            // checks if the file exists on local server and remove the locally saved file as the upload operation was successful
            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)  
            return response;

        } catch (error) {
            // remove the locally saved file as the upload operation failed
            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
            console.log("Error while uploading on cloudinary", error);
            return null;
        }
    };
    
    export {uploadOnCloudinary}