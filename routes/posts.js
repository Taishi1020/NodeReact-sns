const router = require("express").Router();
const post = require("../models/posts")

//投稿
router.post("/", async(req, res) => {
    const newPost = new post(req.body)
    try{
        const savedPost = await newPost.save(); //saveメソッドでmodels/postsのボディに記載したデータ内容がmongooseに登録させる
        res.status(200).json(savedPost)
    }catch (e) {
        return res.status(500).json(e)
    }
})
module.exports = router;
