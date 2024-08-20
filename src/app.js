const express = require('express');
const morgan = require('morgan');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
app.use(express.static(`${__dirname}/public`));
app.all('*', (req, res, next)=>{
  const err = new Error(`Can't find ${req.originalUrl} on server`);
  err.status ="Not Found",
  err.statusCode=404
 next(err); 
})
app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  res.status(err.statusCode).json({status:err.status, message:err.message});
})



module.exports = app;
