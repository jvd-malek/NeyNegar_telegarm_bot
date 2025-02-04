const mongoose = require("mongoose")

// _id will added at server
const linkSchema = new mongoose.Schema({
    txt: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
    },
    path: {
        type: String,
        required: true
    },
    sort: {
        type: [Number],
        required: true,
        minLength: 1,
        maxLength: 6,
    },
    subLinks: {
        type: [{ link: String, path: String, brand: [String] }],
        required: true,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    }
}, { timestamps: true })

const linkModel = mongoose.model("links", linkSchema)

module.exports = linkModel;