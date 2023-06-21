const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerifyOTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VerifyOTP", VerifyOTPSchema);
