const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory =require('./handlerFactroy')
// 
exports.aliasTopTours = (req, res, next) =>{
    req.query.limit ='5'
    req.query.sort='-ratingsAverage,price';
    req.query.fields ='name,price,ratingsAverage,difficulty';
    next();
}

 
exports.getAllTours =catchAsync (async(req, res,next) => {
    const features = new APIFeatures(Tour.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const tours = await features.query;
        res.status(200).json({
            status: 'OK',
            results: tours.length, 
            data: {
                tours: tours 
            }
        });
})
exports.getTour = factory.getOne(Tour,{path:'reviews'})
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour)
exports.deleteTour =factory.deleteOne(Tour);

exports.getTourStats =catchAsync(async (req, res,next) => {
    const stats = await Tour.aggregate([
        {
            $match : {
                ratingsAverge: {
                    $gte: 4.5
                }
            }
        },
        {
            $group : {
                _id: { $toUpper: '$difficulty' },
                avgRating: { $avg: '$ratingsAverge' },
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }

            }
        },
        {
          $sort: { avgPrice: 1 }
        }
    ])
    console.log(stats);
    res.status(200).json({
        status: 'success',
        data: {
          stats : stats
        }
    });
})

exports.getMonthlyPlan = catchAsync(async (req, res,next) => {
    const year = req.params.year * 1; // 2021
  
      const plan = await Tour.aggregate([
        {
           
            $unwind : '$startDates'
        },
        {
            $match: {
              startDates: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`)
              }
            }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }//create array fo tours
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: {
            _id: 0 //make it the _id no longer shows up if put 1 it would acutaly show up
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
});
  