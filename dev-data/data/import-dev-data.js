const fs =require("fs");

const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


//const app = require('./app');

const DB = process.env.DATABASE_LOCAL ;

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(con=>
  console.log("DB connection established"))
  
  
.catch(err => console.error('Error connecting to MongoDB:', err));
//convert into a JS object using JSON.parse
/*const tours= JSON.parse(fs.readFileSync('./tour-simple.json','utf-8'));
error path: with "./" not the current folder is actually where the node application was actually started*/
const tours= JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));
//Import Data Into MongoDB
const importData = async () =>{
    try {
        await Tour.create(tours);
        console.log("Data Imported");
        process.exit();
    } catch(err){
        console.log(err);
    }
}

//Delete all data from collection ( from DB )
const deletDate = async () =>{
    try {
        await Tour.deleteMany();
        console.log("data successfully deleted");
        process.exit();
    } catch(err){
        console.log(err);
    }
}

if (process.argv[2]=== '--import'){
    importData();
}else if(process.argv[2]=== '--delete'){
    deletDate();
}