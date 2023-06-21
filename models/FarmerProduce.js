// Import mongoose ORM
const mongoose = require("mongoose");

// Create FarmerProduce model
const FarmerProduceModel = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
      required: true,
    },
    itemimage: {
      type: String,
      required: true,
    },
    itemquantity: {
      type: Number,
    },
    itemunit: {
      type: String,
    },
    itemstatus: {
      type: String,
      required: true,
      required: true,
    },
    itemprice: {
      type: String,
      required: true,
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
      required: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("FarmerProduce", FarmerProduceModel);
