const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);//"req.body" that's the data that comes with the post request
    res.status(201).json({
        status: 'ok',
        data: {
            review: newReview // Sending the newly created tour in the response 
        }
    });
})

exports.getAllReviews = catchAsync(async (req, res, next) => {
    
    const reviews = await Review.find();
    res.status(200).json({
        status: 'OK',
        results: reviews.length,
        data: {
            reviews
        }
    });
})