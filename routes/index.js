import express, { query } from "express"
import pool from "../db.js"


const router = express.Router()

router.get("/", async (req, res) => {

  res.render("index.njk", {
    title: "My Pocket Henrik",
   
  })
})




export default router