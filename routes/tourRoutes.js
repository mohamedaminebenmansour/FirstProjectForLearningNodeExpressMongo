const express = require('express');

const tourController = require('./../contorollers/tourController');

const router = express.Router();

//router.param('id', tourController.checkId);

//1)Create a chekBody middleware
//2)Check if body contains the name and the price property
//if not , send back 400 (bad request)
//add it to the post ha,dler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
