/*REMEMBER:: evertying that is not related to Express we're gonna do it outiside app.js file */

const mongoose = require('mongoose')

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const app = require('./app');

const DB = process.env.DATABASE_LOCAL ;

mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(con=>
  console.log("DB connection established"))
  
  
.catch(err => console.error('Error connecting to MongoDB:', err));;

/*
const testTour = new Tour({
  name: 'ariena soghra',
  price: 1000,
  rating: 4.5
});

testTour.save().then(doc =>{
  console.log(doc);
}).catch(err=>
  console.log("ERROR:", err));

*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

//comment from ndb 