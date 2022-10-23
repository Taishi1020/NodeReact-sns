const router =  require("express").Router();
const multer = require("multer");

const upload = multer()

//画像mアップロード用API
router.post("/",  upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("画像アップロードに成功しました!" )
    }catch (e) {
        console.log(e)
    }
})

module.exports = router;