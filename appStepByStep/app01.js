/*This here is a function which u^pon calling will add a bunch of methods to our app variable here */
const express = require('express');
const app= express();

app.get('/',(req,res)=>{
    res.status(200).send('Hello World');
}); 

app.get('/js',(req,res)=>{
    res
        .status(200)
        .json({
            message:'Hello from the server side',
            app:'Natours'
        });
}); 

app.post('/',(req,res)=>{
    res.send('you can post to this endpoint');
});

// Start the server
const port=3000;
app.listen(port,()=>{   
    console.log(`Server is running on port ${port}...`);
});
/*Now our server listening  */
