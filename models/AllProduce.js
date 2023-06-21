// Import mongoose ORM
const mongoose = require("mongoose");

// Create FarmerProduce model
const AllProduceModel = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    itemquantity: {
      type: Number,
    },
    itemunit: {
      type: String,
    },
    itemimage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("AllProduce", AllProduceModel);
