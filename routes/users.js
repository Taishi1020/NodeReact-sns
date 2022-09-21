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
        }catch (e) {
            return res.status(400).json(e)
        }
    }else{
        return res.status(400).json("あなた自身のアカウントのみ更新できます。")
    }

})
//ユーザー情報を削除するAPI


module.exports = router;

