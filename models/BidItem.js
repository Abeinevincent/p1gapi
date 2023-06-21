// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const BidItemModel = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    itemquantity: {
      type: Number,
      required: true,
    },
    quantitybuyerneeds: {
      type: Number,
      required: true,
    },
    itemprice: {
      type: String,
      required: true,
    },
    buyerprice: {
      type: Number,
      required: true,
    },
    accepteddate: {
      type: String,
    },
    acceptedtime: {
      type: String,
    },
    buyerId: {
      type: String,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("BidItem", BidItemModel);
