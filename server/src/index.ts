import express from "express";
import {router as authRoutes} from "./routes/auth";

const app = express();

app.use(express.json())
app.use("/auth",authRoutes);

app.listen(5000,() =>{
    console.log("Port is listening at 5000");
})