import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema of data
const testing = new Schema(
  {
    name: {
      type: String,
      require: false,
    },
    lastName: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

//takes the schematic and saves it in a collection
//the name "test", is the name with which the data is stored, YOU CAN CHOOSE OTHER NAME
module.exports = mongoose.model("test", testing); //colection define
