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
.then(con => console.log("DB connection established"))

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection!!');
  server.close(() => {
    process.exit(1);
  })
  
})