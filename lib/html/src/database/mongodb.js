// Connection to the database with mongo

import mongoose from "mongoose";
import mongodb from "../config/mongo.config";

//Functionality to establish whether local or cloud service connection is required

function on_off(control, x) {
  //Function variables
  let controlValue = control;
  let url;

  switch (x) {
    case 1:
      url = mongodb.database.local_url;
      break;
    case 2:
      url = mongodb.database.web;
    default:
      break;
  }

  if (controlValue == "ON" || controlValue == "on") {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((db) => console.log("DB is connected...."))
      .catch((err) => console.log(err));
  } else {
    console.log("Mongo DB is OFF!");
  }
}

module.exports = on_off;
