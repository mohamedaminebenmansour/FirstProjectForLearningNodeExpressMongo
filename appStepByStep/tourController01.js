const fs = require('fs'); 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours =(req, res) => {
    console.log(req.requestTime);
    // Sending a JSON response with status 200
    res.status(200).json({
        status: 'OK',
        results: tours.length, // Number of tours in the data
        requestTime: req.requestTime,
        data: {
            tours: tours // Sending the array of tours
        }
    });
}

exports.getTour = (req, res) => {//:id is a variable
    ///api/v1/tours/:var1/:var2/:var3?
    console.log(req.params);
    const id = req.params.id *1;
     const tour = tours.find(t => t.id===id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }

    // Sending a JSON response with status 200
    res.status(200).json({
        status: 'OK',
        data: {
            tours: tour
        }
       
    });
}

exports.createTour = (req, res) => {
    console.log(req.body); // Logging the request body received
    const newId = tours[tours.length - 1].id + 1; // Generating a new ID for the new tour
    /*Object.assign(): Object.assign() is a method used to copy the values of all enumerable own properties from one or more source 
    objects to a target object. It returns the target object. */
    const newTour = Object.assign({ id: newId }, req.body); // Creating a new tour object with the received body and a new ID

    
    tours.push(newTour); // Adding the new tour to the tours array
    // Writing the updated tours array back to the JSON file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        // Sending a JSON response with status 201
        res.status(201).json({
            status: 'okday',
            data: {
                tour: newTour // Sending the newly created tour in the response
            }
        });
    });
}

exports.updateTour = (req, res) => {
    
    if(req.params.id *1>tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not found'
        });
    }
    res.status(200).json({
        status: 'OK',
        data: {
            tours: tours
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

