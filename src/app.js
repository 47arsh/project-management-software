import express from "express";
import cors from "cors";
const app = express();

//cors configuration
app.use(cors({
    origin : process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials : true,
    methods : ["GET" , "POST", "PUT", "PATCH", "DELETE" , "OPTIONS"],
    allowedHeaders : ["Content-Type" , "Authorization"],
}))
//basic configurations
app.use(express.json({ limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))


// import the routes

import Router from "./routes/healthcheck.routes.js"

app.use("/ap1/v1/healthcheck", Router);

app.get("/" , (req,res) =>{
    res.send("Welcome to Project Camp");
})



export default app;