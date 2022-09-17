const express = require("express");
const app = express();
const usersRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const PORT = 3000;
//ミドルウェア設定
app.use("/api/users", usersRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get("/", (req, res) => {
    res.send("hello express")
})
// app.get("/users", (req, res) => {
//     res.send("hello users")
// })
app.listen(PORT, () => console.log("サーバーが起動しました"))


