import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

// create express App (to make server) 
const app = express()

//apply middleware (things that express going to use)
app.use(cors())
app.use(express.json())  // body-parser : the server can accept json in request body

// initial route , routes file
app.use("/api/v1/restaurants",restaurants)  // v1 : version of the api

// other route handling
app.use("*",(req,res)=>res.status(404).json({error:"not found"}))

// export app as module to import it in the file that accesses to DB
export default app 



