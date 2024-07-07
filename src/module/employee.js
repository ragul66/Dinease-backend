const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeschema = new Schema(
  {
    empname: {
      type: String,
      required: true,
    },
    empNo: {
      type: String,
      required: true,
    },
    empexperience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeschema);
