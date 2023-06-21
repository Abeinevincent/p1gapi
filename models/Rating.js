// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const RatingModel = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    buyerImage: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    ratingnumber: {
      type: Number,
      required: true,
    },
    ratingComment: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Rating", RatingModel);
