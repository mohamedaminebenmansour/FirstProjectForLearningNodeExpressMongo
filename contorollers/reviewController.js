const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory =require('./handlerFactroy')
exports.setTourUserIds = (req, res, next) => {
    //allow nested tours
    if(!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id;//from protected middle
    next();
}
exports.createReview = factory.createOne(Review); 

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
exports.updateReview = factory.updateOne(Review);