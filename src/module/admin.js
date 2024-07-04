const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  amenities: [String],
  photos: [String],
});
const RestaurantadminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    fssaCertificate: {
      type: String,
      required: true,
    },
    hotelInformation: { type: [hotelSchema] },
    credentials: {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", RestaurantadminSchema);
