import express, { query } from "express"
import pool from "../db.js"


const router = express.Router()

router.get("/download", async (req, res) => {

  res.render("download.njk", {
    title: "Download",
   
  })
})




export default router