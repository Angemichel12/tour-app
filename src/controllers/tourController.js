const { query } = require("express");
const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "limit", "sort", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // BUILD QUERY
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`),
    );
    const query = Tour.find(queryStr);

    // const query = Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");
    // EXECUTE QUERY
    const tours = await query;
    //SEND RESPONSE
    res.status(200).json({
      status: "Suceess",
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //const tour = await Tour.findOne({_id:req.param.id})
    res.status(200).json({ status: "Success", data: { tour } });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "Success", tour: newTour });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      message: "Tour deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
