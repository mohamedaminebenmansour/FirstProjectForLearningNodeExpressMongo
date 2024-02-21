const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "A User must have a name " ],
        trim: true,
        maxlength: [40, 'A User name must have less or equal then 40 characters']
    },
    email:{
        type: String,
        required: [ true, "A User must have an email " ],
        unique: true,
        lowercase: true,
        validators: [ validator.isEmail]

    },
    photo: String,
    password :{
        type: String,
        required: [ true, "A User must have an email " ],
        minlength: [8, 'A User password must have more or equal then 8 characters']
    },
    passwordConfirm :{
        type: String,
        required: [ true, "A User must have an email " ]
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;