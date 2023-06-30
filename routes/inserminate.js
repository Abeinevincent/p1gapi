const Inserminate = require("../models/Inserminate");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { totalPigs, pigsOnHeat, typeOfBreed, farmername, farmerContact, distancefromtarmac, farmerdistrict } =
      req.body;
    const newInserm = new Inserminate({
      totalPigs,
      pigsOnHeat,
      typeOfBreed,
      farmername,
      farmerContact,
      distancefromtarmac,
      farmerdistrict,
    });
    const savedInserm = await newInserm.save();
    return res.status(201).json(savedInserm);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const inserms = await Inserminate.find();
    return res.status(200).json(inserms);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Inserminate.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      new: true,
    });
    return res.status(200).json("Updated successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
