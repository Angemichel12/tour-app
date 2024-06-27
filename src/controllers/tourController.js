const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'Suceess',
  //   requestAt: req.reqestTime,
  //   result: tours.length,
  //   data: { tours },
  // });
};

exports.getTour = (req, res) => {
  //   return res.status(404).json({ status: 'Fail', message: 'Not found' });
  // res.status(200).json({ status: 'Success', data: { tour } });
};

exports.createTour = async(req, res) => {
  try{
    const newTour = await Tour.create(req.body);
  res.status(201).json({ status: 'Success', tour: newTour });
  } catch(error){
    res.status(404).json({
      status:'Fail',
      message:"invalid data Sent!"
    })
  }
};

exports.updateTour = (req, res) => {
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour: '<Updated tour here...>',
  //   },
  // });
};

exports.deleteTour = (req, res) => {
  // res.status(204).json({
  //   status: 'Success',
  //   data: {
  //     message: 'Tour deleted successfully',
  //   },
  // });
};
