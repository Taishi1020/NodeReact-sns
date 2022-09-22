const mongoose = require("mongoose");

const PostSchema = new monggose.Schema({
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 200
        },
        img: {
            type: String,
        },
        like: {
            type: Array,
            default: []
        },
    },
{timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema)
