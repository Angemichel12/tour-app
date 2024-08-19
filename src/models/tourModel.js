const mongoose = require("mongoose");
var slugify = require('slugify')

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  slug:{
    type:String,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a descripiton"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  secretTour:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
// DOCUMENT MIDDLEWARE: runs before save() create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower:true});
  next();
})
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// })

// QUERY MIDDLEWARE: runs before find()
tourSchema.pre(/^find/, function(){
  this.find({secretTour:{$ne:true}})
})

// Create virtual properties.
tourSchema.virtual('durationWeek').get(function (){
  return this.duration / 7;
})
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
