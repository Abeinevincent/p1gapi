const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const { totalPigs, pigsOnHeat, typeOfBreed, farmername, farmerContact } =

const InserminateSchema = new Schema(
  {
    totalPigs: {
      type: Number,
      required: true,
    },
    pigsOnHeat: {
      type: Number,
      required: true,
    },

    typeOfBreed: {
      type: String,
      required: true,
    },
    farmername: {
      type: String,
      required: true,
    },
    farmerContact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inserminate", InserminateSchema);
