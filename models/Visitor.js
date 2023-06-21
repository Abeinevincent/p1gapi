// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const VisitorModel = new mongoose.Schema(
  {
    visitorId: {
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
module.exports = mongoose.model("Visitor", VisitorModel);
