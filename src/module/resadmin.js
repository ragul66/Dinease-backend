const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantadminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      unique: true,
    },
    aadharCardphoto: {
      type: String,
      required: true,
    },
    aadharCardno: {
      type: Number,
      required: true,
      unique: true,
    },
    fssaCertificatephoto: {
      type: String,
      required: true,
    },
    fssaCertificateno: {
      type: Number,
      required: true,
      unique: true,
    },
    hotelinfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Hotelinfo",
      },
    ],
    employee: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", RestaurantadminSchema);
