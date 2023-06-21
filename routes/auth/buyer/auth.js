const router = require("express").Router();
const bcrypt = require("bcrypt");
const Buyer = require("../../../models/Buyer");
const { generateToken } = require("../../../helpers/token");

// REGISTER USER ********************

router.post("/register", async (req, res) => {
  // Collect users details
  //generate new password and hash it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newBuyer = new Buyer({
    fullname: req.body.fullname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    isCommercialBuyer: req.body.isCommercialBuyer || false,
    password: hashedPassword,
  });

  const user = await Buyer.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({
      error: `Buyer with email: (${req.body.email}) already exists, try again`,
    });
  } else {
    try {
      //  Save user in the database and send response
      const user = await newBuyer.save();

      return res
        .status(201)
        .json({ message: "Buyer has been created successfully", user });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// LOGIN USER *********************
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await Buyer.findOne({ email: req.body.email });

    // Check whether the user exists in the database
    if (!user) {
      return res
        .status(404)
        .json(
          "Buyer with the provided email doesnot exist, please create an account!"
        );
    }

    // Compare passwords and if password is incorrect, tell the user to try again
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Incorrect pasword, please try again!");
    }

    // Token payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      isBuyer: user.isBuyer,
    };

    // hide password from the database
    const { password, ...others } = user._doc;

    // If the request is succcessful, return success message and user details
    return res.status(200).json({
      message: "Buyer login successful",
      ...others,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
