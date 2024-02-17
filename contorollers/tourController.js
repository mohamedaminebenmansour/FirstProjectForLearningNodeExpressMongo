const fs = require('fs'); 
const Tour = require('./../models/tourModel');

exports.getAllTours =(req, res) => {
    
    res.status(200).json({
        
        status: 'OK',
        requestTime: req.requestTime,
        /*
        results: tours.length, // Number of tours in the data
        
        data: {
            tours: tours // Sending the array of tours
        }*/
    });
}

exports.getTour = (req, res) => {
    const id = req.params.id *1;
    //const tour = tours.find(t => t.id===id);
/*
    res.status(200).json({
        status: 'OK',
        data: {
            //tours: tour
        }
       
    });*/
}

exports.createTour = async (req, res) => {
    try{
        //create() return a promise 
        const newTour = await Tour.create(req.body);//"req.body" that's the data that comes with the post request
        res.status(201).json({
            status: 'ok',
            data: {
                tour: newTour // Sending the newly created tour in the response
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
    
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