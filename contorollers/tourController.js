const fs = require('fs'); 
const Tour = require('./../models/tourModel');
const { query } = require('express');
// 
exports.aliasTopTours = (req, res, next) =>{
    req.query.limit ='5'
    req.query.sort='-ratingsAverage,price';
    req.query.fields ='name,price,ratingsAverage,difficulty';
    next();
}

exports.getAllTours =async (req, res) => {
    try {
        console.log(req.query);
        //Build Query
        //1A)Filtring
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(el=>delete queryObj[el]);
        //1B) Advance filtring (gte,gt,lt,lte)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match=>`$${match}`); 
        let query =  Tour.find(JSON.parse(queryStr));// return query

        //2) Sorting
        //"127.0.0.1:3000/api/v1/tours?sort=price" mongoose will automatically sort them ascending 
        //"127.0.0.1:3000/api/v1/tours?sort=-price" mongoose will automatically sort them descending
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ') ;
            query = query.sort(sortBy);
            //sort('price ratingsAverage') "127.0.0.1:3000/api/v1/tours?sort=price,ratingsAverage"
        }else{
            query =query.sort('-createdAt');
        }
        
        //3)Field limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query= query.select('-__v');
        }

        // 4) Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numTours =await Tour.countDocuments();
            /*why am I throwing an error here?
            Simply because if I throw an erroe here, it will then automaticall and immedately
            move on to the catch block*/
            if(skip >=  numTours) throw new Error ('this page does not exist');
        }
        //Execute Query
        const tours = await query;
        //query.sort().select().skip().limit()
        //Send Response
        res.status(200).json({
            
            status: 'OK',
            
            results: tours.length, // Number of tours in the data
            
            data: {
                tours: tours // Sending the array of tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getTour = async (req, res) => {
    try {
       
        const tour= await Tour.findById(req.params.id);
        //Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'OK',
            data: {
                 tour
            }
        
        });
    }catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
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
            message: err
        });
    }
    
}

exports.updateTour = async (req, res) => {
    
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true ,
            runValidators: true
        });
        res.status(200).json({
            status: 'OK',
            data: {
                /*In fact "tour"==== " tour : "tour" "
                so the tour property is set the "tour" object, but thanks to ES6, we no longer have to do that
                when the property nams has the same name of the value  */
                tour
            }
    }
        
    )
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id)
        
        res.status(204).json({
            status: 'OK',
            data: null
   })
    }catch(err){

    res.status(400).json({
        status: 'fail',
        message: err})
   
    }
}