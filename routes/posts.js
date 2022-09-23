const router = require("express").Router();
const Post = require("../models/posts")
const User = require("../models/User");

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
        } else {
            return res.status(403).json("あなたは他の人の投稿を更新することはできません。")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

//投稿内容を削除
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne({$set: req.body})
            res.status(200).json("投稿内容を更新することができました！")
        } else {
            return res.status(403).json("あなたは他の人の投稿を更新することはできません。")
        }
    } catch (e) {
        return res.status(500).json(e)
    }
})

//特定の投稿を取得する
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
        return res.status(403).json("あなたは他の人の投稿を更新することはできません。")
    } catch (e) {
        return res.status(500).json(e)
    }
})


//特定のユーザーに対していいねを押しにいくAPI
router.put("/:id/like", async (req, res) => {
    //req.body.userIdは自分のユーザーi　params.idは違うユーザー
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            })
            return res.status(200).json("投稿にいいねを押しました！")
        } else {
            //いいねしているユーザーIDを取り除く
            await post.updateOne({
                $pull : {
                    likes: req.body.userId
                }
            })
            return res.status(403).json("投稿のいいねを外しました")
        }
    } catch (e) {
        return res.status(400).json(e)
    }
})
module.exports = router;
