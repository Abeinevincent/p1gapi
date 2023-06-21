const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../../models/User");
const { generateToken } = require("../../../helpers/token");

// REGISTER USER ********************

router.post("/register", async (req, res) => {
  // Collect users details
  //generate new password and hash it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(500).json({
      error: `User with email: (${req.body.email}) already exists, try again`,
    });
  } else {
    try {
      //  Save user in the database and send response
      const user = await newUser.save();

      return res
        .status(201)
        .json({ message: "User has been created successfully", user });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

// LOGIN USER *********************
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check whether the user exists in the database
    if (!user) {
      return res
        .status(404)
        .json(
          "User with the provided email doesnot exist, please create an account!"
        );
    }

    // Compare passwords and if password is incorrect, tell the user to try again
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json("Incorrect pasword, please try again!");

    // Token payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    // hide password from the database
    const { password, ...others } = user._doc;

    // If the request is succcessful, return success message and user details
    return res.status(200).json({
      message: "User login successful",
      ...others,
      token: generateToken(tokenPayload),
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
