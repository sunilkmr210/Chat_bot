const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    chats: {type: Array},
    // chats: [
    //     {
    //         id: {type: Number},
    //         chat: {type: [String]}
    //     }
    // ],
    isAdmin: {type: Boolean, default: false}
})

const User = mongoose.model('User', userSchema);
module.exports = User;