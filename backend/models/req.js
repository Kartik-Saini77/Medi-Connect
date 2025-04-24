const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;