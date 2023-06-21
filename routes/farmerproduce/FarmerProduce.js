const router = require("express").Router();
const FarmerProduce = require("../../models/FarmerProduce");
const {
  verifyToken,
  verifyTokenAndAuthorisedFarmer,
  verifyTokenAndFarmer,
} = require("../../helpers/token");
const Farmer = require("../../models/Farmer");
const AllProduce = require("../../models/AllProduce");

// CREATE FARMER PRODUCE *****************************
router.post("/", verifyTokenAndFarmer, async (req, res) => {
  const availableItem = await FarmerProduce.findOne({
    itemname: req.body.itemname,
    farmerId: req.body.farmerId,
  });
  console.log(availableItem);
  if (availableItem) {
    console.log("Already");
    return res.status(400).json("Item already exists");
  } else {
    const farmerProduce = new FarmerProduce(req.body);
    try {
      const produce = await farmerProduce.save();
      return res.status(201).json(produce);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// UPDATE FARMER PRODUCE *****************************
router.put("/:id", async (req, res) => {
  try {
    const updatedFarmerProduce = await FarmerProduce.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // Also update all produce
    // try{

    //   const updatedProduce = await AllProduce.findOneAndUpdate({
    //     itemname: req.body.itemname
    //   })

    // } catch(err){
    //   console.log(err)
    // }

    res.status(200).json({
      message: "FarmerProduce has been updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET FARMER LISTING ********************************************************
router.get("/:id", async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.findOne({ _id: req.params.id });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S ALL LISTINGS ***********************************************************
router.get("/findfarmer/:farmerId", async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.find({
      farmerId: req.params.farmerId,
    });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S PARTICULAR LISTING ****************************************************
router.get("/findfarmer/:farmerId/:itemname", async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.findOne({
      farmerId: req.params.farmerId,
      itemname: req.params.itemname,
    });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL PRODUCE IN THE DB ****************************************
router.get("/", async (req, res) => {
  try {
    const produce = await FarmerProduce.find();
    return res.status(200).json(produce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL FARMERS WITH A PARTICULAR PRODUCE LISTING *******************
router.get("/findfarmers/:listingId", verifyToken, async (req, res) => {
  try {
    const farmers = await Farmer.find({
      listingId: { $in: req.params.listingId },
    });
    return res.status(200).json(farmers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE ITEM
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await FarmerProduce.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Item has been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
