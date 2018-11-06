const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
const Users = mongoose.model('user', userSchema);
module.exports = {
        userModel: Users,
        userSchema: userSchema
    }