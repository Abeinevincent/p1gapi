// Import mongoose ORM
const mongoose = require("mongoose");

// Create Farmer model
const FarmerModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      subCounty: {
        type: String,
      },
      distanceFromTarmac: {
        type: Number,
        required: true,
      },
    },
    meta: {
      displayImage: {
        type: String,
      },
      primaryPhoneNumber: {
        type: String,
        required: true,
      },
      alternatePhoneNumber: {
        type: String,
        required: true,
      },
    },
    listingId: {
      type: Array,
      default: [],
    },
    isFarmer: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Farmer", FarmerModel);
