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
  });
const Tour = mongoose.model('Tour', tourShema);

module.exports = Tour;