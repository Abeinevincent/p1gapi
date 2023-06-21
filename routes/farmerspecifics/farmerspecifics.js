const router = require("express").Router();
const { verifyToken, verifyTokenAndFarmer } = require("../../helpers/token");
const FarmerSpecifics = require("../../models/FarmerSpecifics");

// Create farmerspecifics
router.post("/", verifyToken, async (req, res) => {
  try {
    const farmer = await FarmerSpecifics.findOne({
      farmername: req.body.farmername,
      itemname: req.body.itemname,
    });
    if (farmer) {
      return res.status(400).json("Farmer already uploaded this produce");
    } else {
      const newFarmerSpecifics = new FarmerSpecifics(req.body);
      const savedfarmer = await newFarmerSpecifics.save();
      return res.status(200).json(savedfarmer);
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all items in a farmerspecifics of a partcular farmer
router.get("/findall/:itemname", async (req, res) => {
  try {
    const farmerspecifics = await FarmerSpecifics.find({
      itemname: req.params.itemname,
    });
    return res.status(200).json(farmerspecifics);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all items in a farmerspecifics of a partcular farmer oof a particular district
router.get("/findall/:itemname/:districtname", async (req, res) => {
  try {
    const farmerspecifics = await FarmerSpecifics.find({
      itemname: req.params.itemname,
      farmerdistrict: req.params.districtname,
    });
    return res.status(200).json(farmerspecifics);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// UPDATE ITEM *****************************
router.put("/:itemname/:farmername", async (req, res) => {
  try {
    const availableItem = await FarmerSpecifics.findOne({
      itemname: req.params.itemname,
      farmername: req.params.farmername,
    });

    if (availableItem) {
      const updatedItem = await FarmerSpecifics.findOneAndUpdate(
        { itemname: req.params.itemname, farmername: req.params.farmername },
        {
          $set: { itemquantity: req.body.itemquantity },
          new: true,
        }
      );
      return res.status(200).json({ message: "Successfully updated" });
    } else {
      return res.status(400).json("Farmer with that Item doesnot exist");
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// DELETE ITEM FROM FARMERSPECIFICS DATABASE ***********
router.delete("/remove/farmer/:farmerId/:itemname", async (req, res) => {
  try {
    const availableFarmer = await FarmerSpecifics.findOne({
      farmerId: req.params.farmerId,
      itemname: req.params.itemname,
    });
    console.log(availableFarmer);
    if (availableFarmer) {
      await FarmerSpecifics.findOneAndDelete({
        farmerId: req.params.farmerId,
        itemname: req.params.itemname,
      });
      return res.status(200).json({ message: "Item has been deleted" });
    } else {
      return res.status(200).json("Farmer is not with this item");
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

module.exports = router;
