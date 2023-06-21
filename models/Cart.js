// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const CartModel = new mongoose.Schema(
  {
    buyerId: {
      type: String,
      required: true,
    },
    listingId: {
      type: String,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
    farmername: {
      type: String,
      required: true,
    },
    itemname: {
      type: String,
      required: true,
    },
    itemprice: {
      type: String,
      required: true,
    },
    farmerprofileimage: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Cart", CartModel);
