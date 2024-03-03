const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview =catchAsync(async (req, res) => {
    //1) Get tour data from collection
    const tours = await Tour.find();
    //2)Building template

    //3) Render template using data from 
    res.status(200).render('overview', {
        title: 'All tours',
        tours: tours
    });
})

exports.getTour = async  (req, res) => {
    // 1) Get the data, for the requested tour (inslucding reviews and guides).
    const tour = await Tour.findOne({slug: req.params.slug})
        .populate({
            path: 'reviews',
            fileds:'review rating user'
        });
    //2) Build template

    //3) Render template using data from
    res.status(200).render('tour',{
      title: "tour"
    });
  }