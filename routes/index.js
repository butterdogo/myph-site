import express, { query } from "express"

import { createPool } from "mysql2"
import bcrypt from "bcrypt"
import pool from "../db.js"
import db from "../db-sqlite.js"

const router = express.Router()

router.get("/", async (req, res) => {

  res.render("index.njk", {
    title: "My Pocket Henrik",
   
  })
})

router.get("/login", async (req, res) => {

  res.render("login.njk", {
    title: "Login"

  })

})


router.post("/login", async (req, res) => {
  const {username} = req.body
  const {password} = req.body

  const dbpassword = await db.get('Select password FROM login WHERE name = ?', username)
    

  if(dbpassword != ""){
  bcrypt.compare(password, dbpassword.password, function(err, result) {
      if (result == true){
        console.log("rätt")
        req.session.loggedin = true
        res.redirect("/post")
      }
      else{
        console.log("fel")
        res.redirect("/login")
      }
  });
  
  } else{res.redirect("/login")}

})


router.get("/post", async (req, res) => {

  if (req.session.loggedin === true) {
    res.render("post.njk")
  } else{
    res.redirect("/login")
  }
  

})


router.post('/post', async (req, res) => {
  const { title, message } = req.body
  
  const [result] = await db.run('INSERT INTO post (title, message) VALUES (?, ?)', [title, message])


  res.redirect('/')
})


export default router