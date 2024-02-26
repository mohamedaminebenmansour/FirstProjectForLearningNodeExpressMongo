const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory =require('./handlerFactroy')

exports.createReview = catchAsync(async (req, res, next) => {
    //allow nested tours
    if(!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id;//from protected middle
    const newReview = await Review.create(req.body);//"req.body" that's the data that comes with the post request
    console.log(newReview)
    res.status(201).json({
        status: 'ok',
        data: {
            review: newReview // Sending the newly created tour in the response 
        }
    });
}) 

exports.getAllReviews = catchAsync(async (req, res, next) => {
    let filter={}
    if(req.body.tour) filter={tour: req.params.tourId}
    const reviews = await Review.find(filter);
    res.status(200).json({
        status: 'OK',
        results: reviews.length,
        data: {
            reviews
        }
    });
})

exports.deleteReview =factory.deleteOne(Review);
