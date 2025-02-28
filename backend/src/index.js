/**************  when you donot connect with socket.io then the code run but when you connect socket.io then give an error   ****** */

// import dotenv from "dotenv";
// import connectDB from "./db/index.js";
// import app from "./app.js";

// dotenv.config({
//     path: "./.env",
// });
// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server is running at Port: ${process.env.PORT}`);
//         });
//         app.on("err", (error) => {
//             console.log("My application is not talk to database", error);
//         });  
//     })
//     .catch((err) => {
//         console.log("Mongo db connection failed !!! ", err);
//     });

/************* it also give me error  ********** */

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRoute from "./routes/user.routes.js";
// import messageRoute from "./routes/message.routes.js";
// import { app, server } from "./SocketIO/server.js";
// import connectDB from "./db/index.js";

// dotenv.config();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// app.use("/api/users", userRoute);
// app.use("/api/messages", messageRoute);

// connectDB()
//     // .then(() => {
//     //     server.listen(process.env.PORT, () => {
//     //         console.log(`Server is Running on port ${process.env.PORT}`);
//     //     });
//     // })
//     // .catch((err) => {
//     //     console.log("Mongo db connection failed !!! ", err);
//     // });
//     server.listen(process.env.PORT, () => {
//         console.log(`Server is Running on port ${process.env.PORT}`);
//     });

/************* when you connect with socket.io this code does not give error *********************************** */

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.routes.js";
import { app, server } from "./SocketIO/server.js";
import path from "path";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

//routes
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);

// ************************** code for deployment  ********************************
if(process.env.NODE_ENV === 'production'){
    const dirPath=path.resolve()

    app.use(express.static("./frontend/dist"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./frontend/dist","index.html"))
    })
}



server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
