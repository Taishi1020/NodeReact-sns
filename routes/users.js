const router = require("express").Router();
const User = require("../models/User")

//CRUD
//ユーザー情報の更新するAPI
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("ユーザー情報が更新されました。")
        } catch (e) {
            return res.status(400).json(e)
        }
    } else {
        return res.status(400).json("あなた自身のアカウントのみ更新できます。")
    }

})
//ユーザー情報を削除するAPI
router.delete("/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        console.log(deleteUser)
        res.status(200).json("ユーザー情報の削除が完了しました。")
    } catch (e) {
        return res.status(500).json(e)
    }
})

//特定のユーザー情報の取得
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other)
    } catch (e) {
        return res.status(500).json(e)
    }
})

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    //req.body.userIdは自分のユーザーi　params.idは違うユーザー
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                })
                await currentUser.updateOne({
                        $push: {
                            followings: req.params.id,
                        },
                    }
                )
                return res.status(200).json("フォローに成功しました！")
            } else {
                return res.status(403).json("あなたはすでにフォローしています。")
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    } else {
        return res.status(500).json("自分自身はフォローできません。")
    }
})

//ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
    //req.body.userIdは自分のユーザーi　params.idは違うユーザー
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            //フォローに存在していたらフォローを外せる
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    },
                })
                await currentUser.updateOne({
                        $pull: {
                            followings: req.params.id,
                        },
                    }
                )
                return res.status(200).json("フォロー解除しました！")
            } else {
                return res.status(403).json("このユーザーはフォローを解除できません。")
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    } else {
        return res.status(500).json("自分自身はフォローできません。")
    }
})

//Password リセット
// router.post("/PasswordReset", async (req, res) => {
//     try {
//         const CrrentUser = await User.findById(req.params.id)
//         const PasswordRsetUser = await User.findOne({email: req.body.email})
//
//         if (CrrentUser == PasswordRsetUser){
//             const DeletePassword = await User.findOneAndDelete({password: req.params.password})
//             if (!DeletePassword) return res.status(403).json("パスワードの削除時にエラーが発生しました。")
//             const NewPassword  = await new User({
//                 password: req.body.password
//             })
//             const NewLegisterPassword = await NewPassword.save();
//             return res.status(200).json(NewLegisterPassword)
//         }else{
//             return res.status(400).json("前回登録したメールアドレスと一致しませんでした。")
//         }
//     } catch (e) {
//         res.status(500).json(e)
//     }
//
// })

module.exports = router;

