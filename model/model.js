const mongoose=require('mongoose');
const UserSchema = mongoose.Schema({
    resetPasswordToken: String,
    resetPasswordExpires: Date
}); 
 module.exports = mongoose.model('User', UserSchema);
const Users = mongoose.model('user', UserSchema);
module.exports = {
    userModel: Users,
    UserSchema: UserSchema
}