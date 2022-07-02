import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

// configure .env
dotenv.config()

// access to mongoclient
const MongoClient = mongodb.MongoClient

// create port number
const port = process.env.PORT || 8000 // if cannot access port in env file it will use 8000

// connect to DB
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize : 50, // people can connect at a time
        wtimeoutMS : 2500,  // request timeout
        useNewUrlParser : true, // mongodb nodejs driver rewrote the tool that it uses to parse mongodb connection strings
    }
)
// catch errors
.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
//
.then(async client =>{
    // strat server
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})