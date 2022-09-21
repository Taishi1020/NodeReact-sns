const router = require("express").Router();
router.get("/", (req, res) => {
    res.send("psot router")
})
module.exports = router;
