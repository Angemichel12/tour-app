const mongoose = require("mongoose");
var slugify = require('slugify')

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength:[40, 'A tour must have less than or equal 40 characters'],
    minlength:[10, 'A tour must have more than or equal 10 characters'],
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
    enum:{
      values:['easy', 'medium', 'difficult'],
      message:"Difficulty is either: easy, medium, difficulty"
    }
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
  priceDiscount: {
    type:Number,
    validate:{
      validator:function(val){
        return val < this.price;
      },
      message:'Discount must be less than price'
    }
  },
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

// AGGREGATION MIDDLEWARE: runs before aggrations
tourSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {secretTour:{$ne:true}}})
  next();
})

// Create virtual properties.
tourSchema.virtual('durationWeek').get(function (){
  return this.duration / 7;
})
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
