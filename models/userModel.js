let mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
}, {
    collection: 'user',
    timestamps: true
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;