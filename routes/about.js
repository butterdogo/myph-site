import express, { query } from "express"
import pool from "../db.js"


const router = express.Router()

router.get("/about", async (req, res) => {

  res.render("about.njk", {
    title: "About",
   
  })
})




export default router