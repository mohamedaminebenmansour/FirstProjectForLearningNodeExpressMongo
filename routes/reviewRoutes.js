const express = require('express');
const reviewController = require('./../contorollers/reviewController');
const authController = require('./../contorollers/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post( 
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
    );

module.exports = router;
