const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

exports.signup = catchAsync(async (req, res, next) => {
    //this is line is not secure because everything is request body
    //const newUser = await User.create(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    console.log(process.env.JWT_EXPIRES_IN)
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(201).json({
        status: 'ok',
        token: token,
        data: {
            user: newUser
        }
    })
});