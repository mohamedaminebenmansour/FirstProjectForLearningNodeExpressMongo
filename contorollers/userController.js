const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');


exports.getAllUsers =catchAsync (async(req, res,next) => {
    const features = new APIFeatures(User.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const users = await features.query;
        res.status(200).json({
            status: 'OK',
            results: users.length, 
            data: {
                users
            }
        });
})

exports.createUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}

exports.getUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}

exports.updateUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}

exports.deleteUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}