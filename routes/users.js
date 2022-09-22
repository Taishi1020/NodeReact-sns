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
    }catch (e) {
        return res.status(500).json(e)
    }
})

//特定のユーザー情報の取得
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, updatedAt, ...other } = user._doc;
        res.status(200).json(other)
    }catch (e) {
        return res.status(500).json(e)
    }
})

//ユーザーのフォロー


module.exports = router;

