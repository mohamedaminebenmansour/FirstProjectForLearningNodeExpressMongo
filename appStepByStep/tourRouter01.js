const express = require('express');
const tourController = require('./../contorollers/tourController');
const router =express.Router(); 

/*Param middleware is middleware that only runs for certain parameters, so basically,when we have a certain parameter in our URL. 
Now in our example here, the only parameter that we might have in our route URL is the "id"
And so we can write middleware that only runs when this id is present in the URL
    Now in a param middleware function, we actually get access to a fourth argument and that one is the value of the parameter in question.
So we usually call that one val, which stands for value.
*/
router.param('id',(req, res,next,val) =>{
    console.log(`tour id si ${val}`);
    next();
})
/*big picture : let's suppose we have an incoming request on tours/id. So that request will then go through all these middleware
1)app.use(morgan(''));
2)app.use(express.json());
3)app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
}) 
4)app.use('/api/v1/tours',tourRouter);//this is called mounting the router
5)router.param('id',(req, res,next,val) =>{
    console.log(`tour id si ${val}`);
    next();
})
    And so then this code will be run.And again,( 5) ) that's only because it has an id in the route.
If not, well, then this would simply be ignored and it would move on right to the next middleware
*/

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


module.exports = router;