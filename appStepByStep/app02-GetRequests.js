/*This here is a function which u^pon calling will add a bunch of methods to our app variable here */
const express = require('express');
const app= express();
const fs = require('fs');

const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//Get Request :: start
app.get('/api/v1/tours', (req, res)=> {
    res.status(200).json({
        status: 'OK',
        results: tours.length,
        data: {
            tours: tours
        }
    });
}) 

//Get Response :: end

// Start the server
const port=3000;
app.listen(port,()=>{   
    console.log(`Server is running on port ${port}...`);
});
/*Now our server listening  */
