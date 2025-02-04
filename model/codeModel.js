const mongoose = require("mongoose")

// _id will added at server
// this model doesnt need virtual relationship
const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    exTime: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const codeModel = mongoose.model("codes", codeSchema)

module.exports = codeModel;