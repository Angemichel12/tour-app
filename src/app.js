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

module.exports = app;
