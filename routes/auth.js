const router =  require("express").Router();
const User = require("../models/User")

//ユーザー登録
router.post("/register",async(req,res)=>{
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        const user = await newUser.save();
        return res.status(200).json(user)
    }catch (e) {
        return res.status(500).json(e)
    }
})


//login処理
// 1 postmanで入力した、emailがユーザーのemailと一致しているか照合する
// 2 照合しなかった場合、エラーメッセージでユーザーが見つかりませんでした。と出力させる
// 3 ユーザーが見つかった場合、password照合を行う
// 4　入力したパスワードがユーザーパスワードと一致しなかったら、404エラーとパスワードが違います。とエラーメッセージを出力させる
// 5 会っていれば、200番ステータスと、jsonフォーマットでデータを返す処理を作成させる
// 1~5の処理に進まない場合ははレスポンスで500番エラーを返すk

router.post("/login", async(req, res) => {
    //psotmanを使ってユーザーがの照合を確認する想定の記述↓
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(404).send("ユーザーが見つかりませんでした。")

        //３〜４のパスワード照合列挙内容その1
        const legsterUser = req.body.password === user.password　//trueの場合36行目のコード処理に移る falseの場合!legsterUserの処理に入る
        if (!legsterUser) return res.status(404).json("ユーザーが見つかりませんでした。")
        return res.status(200).json(user)

        // //３〜４のパスワード照合列挙内容その２
        // if (user.password === req.body.password) {
        //     return res.status(200).json(user)
        // }else{
        //     return res.status(400).json("パスワードが一致しませんでした。") //false
        // }
    }catch (e) {
        return res.status(500).json(e)
    }
} )

module.exports = router;