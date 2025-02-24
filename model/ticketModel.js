const mongoose = require("mongoose")


// _id will added at server
const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    response: {
        default: "",
        type: String,
    },
    status: {
        default: "در انتظار بررسی",
        type: String,
    },
    title: {
        type: String,
        required: true,
        maxLength: 100,
    },
    txt: {
        type: String,
        required: true,
        maxLength: 500,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    }
}, { timestamps: true })

const ticketModel = mongoose.model("tickets", ticketSchema)

module.exports = ticketModel;