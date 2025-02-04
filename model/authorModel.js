const mongoose = require("mongoose")

// _id will added at server
// this model doesnt need virtual relationship
const authorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    lastname: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
    }
}, { timestamps: true })

const authorModel = mongoose.model("authors", authorSchema)

module.exports = authorModel;