const express = require('express');
// Importing Express.js framework
const app = express(); // Creating an instance of Express application
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./contorollers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //we can serve static file from a folder and not route

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2)ROUTE HADNLERS

app.use('/api/v1/tours', tourRouter); //this is called mounting the router
app.use('/api/v1/users', userRouter); //this is called mounting the router

app.all('*', (req, res, next) => {
/*
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
  */
 //const err = new Error(`Can't find ${req.originalUrl} on this server`);
 //err.status= "fail";
 //err.statusCode = 404;
 next(new AppError(`Can't find ${req.originalUrl} on this server ! `),404);
})



//Headling middleware
/*By specifying 4 parameteres Ewpress automaticaally knows that this entire function here is an error middleware */
app.use(globalErrorHandler)

module.exports = app;
