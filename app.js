const express = require('express');
// Importing Express.js framework
const app = express(); // Creating an instance of Express application
const morgan = require('morgan');
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
// 4)START SERVER

module.exports = app;
