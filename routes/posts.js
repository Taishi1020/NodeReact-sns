const router = require("express").Router();
const Post = require("../models/posts")
const User = require("../models/User");

//投稿を作成する
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

//タイムラインAPI実装
router.get("/timeline/:userId", async(req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id})
        //自分がフォローしている友度断ちの投稿内容を全て取得する
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        )
        return res.status(200).json(userPosts.concat(...friendPosts))
     }catch (e) {
        return res.status(500).json(e)
    }
})


//プロフィール専用のタイムラインの取得
router.get("/profile/:username", async(req, res) => {
    try{
        const user = await User.findOne({username: req.params.username}); //findOneを使う場合はプロパティの指定が必要
        const posts = await Post.find({userId: user._id})
        return res.status(200).json(posts)
    }catch (e) {
        return res.status(500).json(e)
    }

})

module.exports = router;
