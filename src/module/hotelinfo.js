//hotelinfo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelinfoSchema = new Schema(
  {
    hotelName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotelinfo", hotelinfoSchema);
