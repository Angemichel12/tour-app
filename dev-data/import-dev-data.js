const dotenv = require("dotenv/config");
const mongoose = require("mongoose");
const Tour = require("./../src/models/tourModel");
const fs = require("fs");
DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully!");
  });
// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, "utf-8"),
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteDate = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const exportDate = async () => {
  try {
    const tours = await Tour.find();
    fs.writeFileSync(
      `${__dirname}/data/export-tours-simple.json`,
      JSON.stringify(tours),
      "utf-8",
    );
    console.log("Data exported Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteDate();
} else if (process.argv[2] === "--export") {
  exportDate();
}
