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

exports.getMe = (req, res, next) =>{
    req.params.id = req.user.id;
    next();
}
exports.getAllUsers = factory.getAll(User);
exports.createUser =(req,res)=> {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yed defined! please use /signup instead'
    })
}
exports.getUser = factory.getOne(User);

//Do not update passwrds with this
exports.updateUser =factory.updateOne(User);
exports.deleteUser =factory.deleteOne(User);



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