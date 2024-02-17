/*This here is a function which u^pon calling will add a bunch of methods to our app variable here */
// Importing required modules
const express = require('express'); // Importing Express.js framework
const app = express(); // Creating an instance of Express application
const fs = require('fs'); // Importing Node.js file system module

/*here is middleware and middleware is basically a function that can modify the incoming request data
so it's called middleware because it stands between in the middle of the request and the response
Its jusa a step that the request goes through while it's veing processed 
    so you see that in order to use middleware, wu used "app.use" 
The "use" method is the one that we use in order to use middleware
    Let's analyse this line "app.use(express.json());":: this express.json() here calling json method basically
return a function. And so that function is then added to the middleware stack

*/
app.use(express.json());

app.use((req, res, next) => {
    console.log("hello from the middleware 1"); // that is the code that we want to execute here
    /* we actually need to call the next function, If we dedn't then the request-response cycle would be stuck at this point
    we wouldn"t be able to move on and we would never ever send a back a response to thr client 
    ///VERY IMPORTANT : NEVER FORGOT TO USE next IN ALL OF YOUR MIDDLEWARE*/ 
    next(); 
})

app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString();
    next();
})
// Reading data from a JSON file and parsing it
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours =(req, res) => {
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
const getTour = (req, res) => {//:id is a variable
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
    
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

const deleteTour = (req, res) => {
    
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

// Handling GET requests to '/api/v1/tours' endpoint
//app.get('/api/v1/tours',getAllTours );

// Handling GET requests to '/api/v1/tours/var' endpoint with var is variable can be string,number ...
//app.get('/api/v1/tours/:id', getTour );

// Handling POST requests to '/api/v1/tours' endpoint
//app.post('/api/v1/tours', createTour );

//app.patch('/api/v1/tours/:id', updateTour);

//app.delete('/api/v1/tours/:id', deleteTour );

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.use((req, res, next) => {
    console.log("hello from the middleware 2"); 
    next(); 
})
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

// Starting the server and listening on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
