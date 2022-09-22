const router = require("express").Router();
const Post = require("../models/posts")

//投稿
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save(); //saveメソッドでmodels/postsのボディに記載したデータ内容がmongooseに登録させる
        res.status(200).json(savedPost)
    } catch (e) {
        return res.status(500).json(e)
    }
})

//投稿内容の更新
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({$set: req.body})
            res.status(200).json("投稿内容を更新することができました！")
        }else{
         return res.status(403).json("あなたは他の人の投稿を更新することはできません。")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})
module.exports = router;
