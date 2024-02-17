/*This here is a function which u^pon calling will add a bunch of methods to our app variable here */
// Importing required modules
const express = require('express'); // Importing Express.js framework
const app = express(); // Creating an instance of Express application
const fs = require('fs'); // Importing Node.js file system module

/*here is middleware and middleware is basically a function that can modify the incoming request data
so it's called middleware because it stands between in the middle of the request and the response
Its jusa a step that the request goes through while it's veing processed */
app.use(express.json());

// Reading data from a JSON file and parsing it
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Handling GET requests to '/api/v1/tours' endpoint
app.get('/api/v1/tours', (req, res) => {
    // Sending a JSON response with status 200
    res.status(200).json({
        status: 'OK',
        results: tours.length, // Number of tours in the data
        data: {
            tours: tours // Sending the array of tours
        }
    });
});

// Handling POST requests to '/api/v1/tours' endpoint
app.post('/api/v1/tours', (req, res) => {
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
});

// Starting the server and listening on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
