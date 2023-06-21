const router = require("express").Router();
const Buyer = require("../../models/Buyer");
const { verifyTokenAndAuthorisedBuyer } = require("../../helpers/token");
const bcrypt = require("bcrypt");

// UPDATE USER *****************************
router.put("/update/:id", verifyTokenAndAuthorisedBuyer, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Buyer has been updated", updatedBuyer });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE FARMER PASSWORD *****************************
router.put("/updatepassword/:id", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await Buyer.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: req.body.password },
      },
      { new: true }
    );

    res.status(200).json({ message: "User's password has been updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET BUYER ***********************
router.get("/:id", async (req, res) => {
  try {
    const user = await Buyer.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET FARMER BY EMAIL ***********************
router.get("/getbuyer/:email", async (req, res) => {
  try {
    const buyer = await Buyer.findOne({ email: req.params.email });
    const { password, ...others } = buyer._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
