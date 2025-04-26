const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Medi");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        enum: ['volunteer', 'user'],
        default: 'user'
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request"
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;