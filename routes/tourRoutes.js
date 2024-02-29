const express = require('express');

const tourController = require('./../contorollers/tourController');
const authController = require('./../contorollers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours)

router
  .route('/tour-stats')
  .get(tourController.getTourStats)
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide','guide'),
    tourController.getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin)
// /tours-distance?distance=500&center=-40,45&unit=km
// /tours-distance/233/center/-40,50/unit/km
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin','lead-guide'),
    tourController.createTour
    );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    tourController.updateTour,
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour);


module.exports = router;
