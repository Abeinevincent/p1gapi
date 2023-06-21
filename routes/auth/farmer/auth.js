const router = require("express").Router();
const bcrypt = require("bcrypt");
const Farmer = require("../../../models/Farmer");
const { generateToken } = require("../../../helpers/token");
const axios = require("axios");
const farmerService = require("../../../services/farmer");

// REGISTER USER ********************

// REGISTER USER ********************
router.post("/register", async (req, res) => {
  try {
    // GET COODINATES OF SPECIFIED PLACE
    try {
      const response = await axios.get(`${process.env.OPENCAGE_URL}`, {
        params: {
          key: process.env.OPENCAGE_API_KEY,
          q: req.body.q,
        },
      });

      // Example coordinates in DMS format
      const latitude = Number(response.data.results[0].geometry.lat);
      const longitude = Number(response.data.results[0].geometry.lng);
      console.log(latitude, longitude);
      const farmer = await farmerService.store(req.body, longitude, latitude);

      return res
        .status(200)
        .json({ message: "Farmer registration successful.", farmer: farmer });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } catch (error) {
    // TODO: Error is no being returned in json
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

// LOGIN USER *********************
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await Farmer.findOne({ email: req.body.email });

    // Check whether the user exists in the database
    if (!user) {
      return res
        .status(404)
        .json(
          "Farmer with the provided email doesnot exist, please create an account!"
        );
    }

    // Compare passwords and if password is incorrect, tell the user to try again
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Incorrect password, please try again!");
    }

    // Token payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      isFarmer: user.isFarmer,
    };

    // hide password from the database
    const { password, ...others } = user._doc;

    // If the request is succcessful, return success message and user details
    return res.status(200).json({
      message: "Farmer login successful",
      ...others,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
