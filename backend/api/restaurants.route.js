import express from "express"

// access express router
const router = express.Router()

// route / respond with hello world
router.route("/").get((req,res)=>res.send("hello world"))

export default router