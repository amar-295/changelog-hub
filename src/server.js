import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

import app from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    
    app.on("error", (error) => {
        console.log("error", error);
        throw error;
    })

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });    
})
.catch((error) => {
    console.log("MonogoDB connection failed", error);
});