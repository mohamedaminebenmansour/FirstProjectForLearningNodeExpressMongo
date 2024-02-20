const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: 
    {
      type: String,
      required: [ true , "A tour must have a name " ],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']

    },
    slug: String,
    duration: 
    {
        type: Number,
        required: [ true, "A tour must have a duration" ]
    },
    maxGroupSize: 
    {
        type: Number,
        required: [ true, "A tour must have a maxGroupSize" ]
    },
    difficulty: 
    {
      type: String,
      required: [ true, "A tour must have a difficulty" ],
      enum: {// only for Strings
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    rating: 
    {
      type : Number,
      default:4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsAverge: 
    {
      type : Number,
      default:4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type : Number,
      default:4.5
    },
    price: {
      type: Number,
      required: [ true , "A tour must have a price" ]
    },
    priceDiscount: {
      type: Number,
      validate : function(val){
        //this only points to current doc on NEW document creation
        return val < this.price; 
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    },
    summary :{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type : String,
        required: [true,'A tour must have a cover image']
    },
    image: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretTour:{
      type: Boolean,
      default: false
    }
  },
  {
    toJSON:{virtuals :true},
    toObject:{virtuals :true}
    /*we cannot use this virtual property here in a query, because they're technically not part of the database.
    So we can not say, for example,tour.find where duration weeks is equal to one. That's not gonna work, 
    again because this property is not actually part of the database. */
  });
/*Virtual properties are basically fields that we can define on our schema but that will not be persisted.
So they will not be saved into the database in order to save us some space there.And most of the time, of course,
we want to really save our data to the database, but virtual properties make a lot of sense for fields that 
can be derived from one another. For example a conversion from miles to kilometers,it doesn't make sense to store 
these two fields in a database if we can easily convert one to the other */
/*I used this regular function here because remember, an arrow function does not get its own "this" keyword.
In here we actually need the "this" keyword because the disk keyword in this caseis going to be pointing to the current document.
And so usually when we want to use this,then we should always use a regular function. */
tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
});

//Document Middelware: runs before .save() and .create() not .insertMany()
tourSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower:true});
  next();
})
/*
 tourSchema.pre('save', function(next){
  console.log('wil save document ...');
  next();
 })
tourSchema.post('save', function(doc,next){
  console.log(doc);
  next();
})
*/

// QUERY MIDDLEWARE
/*query middleware allows us to run functions before or after a certain query is executed.
And so let's now add a pre-find hook, so basically, a middleware that is gonna run
before any find query is executed.
 */

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next){
  this.pipeline().unshift({
    $match : {
      secretTour: { $ne: true }
    }
  })
  console.log(this.pipeline());
  next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;