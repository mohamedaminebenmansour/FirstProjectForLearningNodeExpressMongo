const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
            return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    }
});

userSchema.pre('save',async function(next){
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);
    // Delete passwordConfirm field (IMPORTANT!)
    /*we have required on usershema , now you might wonder wyh this works?
    because we actuallay set passwrd confirm  to a require but that simply
    means that it's a required input , not it's required to actually be presisted. */
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;