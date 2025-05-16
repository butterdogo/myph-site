import express, { query } from "express"

import { createPool } from "mysql2"
import bcrypt from "bcrypt"
import pool from "../db.js"
import db from "../db-sqlite.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const result = await db.all("SELECT * FROM post ORDER BY created_at DESC;")


  
  
  res.render("index.njk", {
    title: "My Pocket Henrik",
    posts: result,
    loggedin: req.session.loggedin,

  });

});



router.get("/login", async (req, res) => {

  res.render("login.njk", {
    title: "Login"

  })

})


router.post("/login", async (req, res) => {
  const { username } = req.body
  const { password } = req.body

  const dbpassword = await db.get('Select password FROM login WHERE name = ?', username)


  if (dbpassword != "") {
    bcrypt.compare(password, dbpassword.password, function (err, result) {
      if (result == true) {
        console.log("rätt")
        req.session.loggedin = true
        res.redirect("/")
      }
      else {
        console.log("fel")
        res.redirect("/login")
      }
    });

  } else { res.redirect("/login") }

})


router.get("/post", async (req, res) => {

  if (req.session.loggedin === true) {
    res.render("post.njk")
  } else {
    res.redirect("/login")
  }


})


router.post('/post', async (req, res) => {
  const { title, message } = req.body

  const result = await db.run('INSERT INTO post (title, message) VALUES (?, ?)', title, message)

  console.log(result)
  res.redirect('/')
})

router.get("/:id/delete", async (req, res) => {
  if (req.session.loggedin === true) {

    const id = req.params.id
    await db.run('DELETE FROM post WHERE id = ?', id)

    res.redirect("/")
  } else {
    res.redirect("/login")
  }


})

router.get('/logout', async (req, res) => {

  req.session.loggedin = false
  res.redirect("/")


})



export default router