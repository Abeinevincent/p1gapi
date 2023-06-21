const router = require("express").Router();
const Farmer = require("../../models/Farmer");
const {
  verifyTokenAndAuthorisedFarmer,
  verifyTokenAndFarmer,
  verifyToken,
} = require("../../helpers/token");
const bcrypt = require("bcrypt");

// UPDATE FARMER *****************************
router.put("/:id", verifyTokenAndAuthorisedFarmer, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Farmer has been updated", updatedFarmer });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// UPDATE FARMER PASSWORD *****************************
router.put("/updatepassword/:id", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await Farmer.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: req.body.password },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User's password has been updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET FARMER ***********************
router.get("/:id", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ _id: req.params.id });
    const { password, ...others } = farmer._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET FARMER BY EMAIL ***********************
router.get("/getfarmer/:email", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ email: req.params.email });
    const { password, ...others } = farmer._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL FARMERS ************************

router.get("/", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    return res.status(200).json(farmers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
