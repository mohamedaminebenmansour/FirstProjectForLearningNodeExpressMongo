const express = require('express');
const reviewController = require('./../contorollers/reviewController');
const authController = require('./../contorollers/authController');
/*"{mergeParams: true} "why do we actualy need this here??
    It's because , by dfault each router has only access to the parameters
of their specific routes
with the mergeParams we have access to tourId*/
const router = express.Router({mergeParams: true});
// POST /tour/rez6ezr56ezt/review
// POST /reviews
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post( 
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
    );

module.exports = router;
