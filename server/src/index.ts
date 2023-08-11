import express from "express";
import {router as authRoutes} from "./routes/auth";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json())
app.use("/auth",authRoutes);

mongoose.connect(
    "mongodb+srv://MALARVIZHI:Clustermalar@subapp.z9cn1na.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as Parameters<typeof mongoose.connect>[1]
)

.then(()=>{
    console.log("Connected to DB");

    app.listen(5000,() =>{
        console.log("Port is listening at 5000");
    });
})   
.catch((error)=>{
    console.log(error);
})
