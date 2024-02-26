const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const { findByIdAndUpdate } = require('../models/tourModel');
const factory =require('./handlerFactroy')

 
const filterObj = (obj, ...allowedFields)=>{
    const newObject={};
    Object.keys(obj).forEach(el =>{
        if (allowedFields.includes(el))
            newObject[el] = obj[el];
    })
return newObject;
};

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
exports.createUser = factory.createOne(User);
/*
exports.createUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}
*/

exports.getUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}
//Do not update passwrds with this
exports.updateUser =factory.updateOne(User);
exports.deleteUser =factory.deleteOne(User);

/*
exports.deleteUser =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined!'
    });
}
*/

exports.updateMe = catchAsync(async(req, res,next)=> {
    // 1) Error if user POSTs passwrod data
    
    if (req.body.password || req.body.passwordConfirm) {
        return next(
          new AppError(
            'This route is not for password updates. Please use /updateMyPassword.',
            400
          )
        );
      }
    // 2) update user
      //body.role: adimn "Not allowed"
    const fileredBody = filterObj(req.body, 'name','email');
    const updatesUser = await User.findByIdAndUpdate(req.user.id,fileredBody,{
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'OK',
        data: {
            user: updatesUser
        }
    })
}) 

exports.deleteMe = catchAsync(async (req, res,next) => {
     await User.findByIdAndUpdate(req.user.id,{active:false})
     res.status(204).json({
         status: 'OK',
         data: null
     })
})