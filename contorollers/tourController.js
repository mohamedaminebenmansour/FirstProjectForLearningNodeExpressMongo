const fs = require('fs'); 
const Tour = require('./../models/tourModel');
/*
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkId = (req, res,next,val) => {
    if(req.params.id *1>tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Name and price are required'
        });
    }
    next();
}
*/

exports.getAllTours =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(200).json({
        /*
        status: 'OK',
        results: tours.length, // Number of tours in the data
        requestTime: req.requestTime,
        data: {
            tours: tours // Sending the array of tours
        }*/
    });
}

exports.getTour = (req, res) => {//:id is a variable
    ///api/v1/tours/:var1/:var2/:var3?
    console.log(req.params);
    const id = req.params.id *1;
    //const tour = tours.find(t => t.id===id);

    res.status(200).json({
        status: 'OK',
        data: {
            //tours: tour
        }
       
    });
}

exports.createTour = (req, res) => {
    /*
    const newTour = new Tour({});
    newTour.save();*/
        
    res.status(201).json({
        status: 'okday',
        data: {
            tour: newTour // Sending the newly created tour in the response
        }
    });
    
}

exports.updateTour = (req, res) => {
    
    
    res.status(200).json({
        status: 'OK',
        data: {
            //tours: tours
        }
   }
    
   )
}

exports.deleteTour = (req, res) => {
    
    if(req.params.id *1>tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }
    res.status(204).json({
        status: 'OK',
        data: null
   }
    
   )
}

