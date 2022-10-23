const express = require("express");
const app = express();
const PORT = 3001;

//routes設定
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const uploadRoute = require("./routes/upload")

//mogodb接続
const mongoose = require("mongoose");
require("dotenv").config();

//データーベース接続
mongoose
    .connect(process.env.MONGURL)
    .then(() => {
        console.log("DBと接続中・・・")
    }).catch((err) => {
    console.log(err)
    })

//ミドルウェア設定(routing設定)
app.use(express.json())
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/upload", uploadRoute)

app.get("/", (req, res) => {
    res.send("hello express")
})
app.listen(PORT, () => console.log("サーバーが起動しました"))


