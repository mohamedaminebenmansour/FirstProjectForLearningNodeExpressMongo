const mongoose = require('mongoose');
const tourShema = new mongoose.Schema({
    name: 
    {
      type: String,
      required: [ true , "A tour must have a name " ],
      unique: true,
      trim: true
      
    },
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
      required: [ true, "A tour must have a difficulty" ]
    },
    rating: 
    {
      type : Number,
      default:4.5
    },
    ratingsAverge: 
    {
      type : Number,
      default:4.5
    },
    ratingsQuantity: {
      type : Number,
      default:4.5
    },
    price: {
      type: Number,
      required: [ true , "A tour must have a price" ]
    },
    priceDiscount: Number,
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
    startDates: [Date]
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
tourShema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourShema);

module.exports = Tour;