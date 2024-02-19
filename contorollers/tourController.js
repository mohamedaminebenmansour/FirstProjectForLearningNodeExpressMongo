const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
// 
exports.aliasTopTours = (req, res, next) =>{
    req.query.limit ='5'
    req.query.sort='-ratingsAverage,price';
    req.query.fields ='name,price,ratingsAverage,difficulty';
    next();
}


exports.getAllTours =async (req, res) => {
    try {
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