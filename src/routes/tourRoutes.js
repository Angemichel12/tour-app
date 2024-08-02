const express = require("express");
const tourController = require("./../controllers/tourController");

const route = express.Router();

route
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

route.route("/tour-stats").get(tourController.getTourStat);

route
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

route
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = route;
