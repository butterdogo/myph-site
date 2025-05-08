import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import indexRouter from "./routes/index.js"
import aboutRouter from "./routes/about.js"
import downloadRouter from "./routes/download.js"
import bodyParser from "body-parser"

const app = express()
const port = 3000

nunjucks.configure("views", {
    autoescape: true,
    express: app,
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRouter)
app.use("/", aboutRouter)
app.use("/", downloadRouter)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})