// Import mongoose ORM
const mongoose = require("mongoose");

// Create Buyer model
const BuyerModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileimage: {
      type: String,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isCommercialBuyer: {
      type: Boolean,
      required: true,
    },
    isBuyer: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Buyer", BuyerModel);
