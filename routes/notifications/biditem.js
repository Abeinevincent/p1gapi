const router = require("express").Router();
const AllProduce = require("../../models/AllProduce");
const BidItem = require("../../models/BidItem");
const FarmerProduce = require("../../models/FarmerProduce");
const FarmerSpecifics = require("../../models/FarmerSpecifics");

// Create bidItems*********************************************************************
router.post("/", async (req, res) => {
  const { buyerId, farmerId, itemname, quantitybuyerneeds, itemquantity } =
    req.body;
  const availableFarmersItem = await BidItem.findOne({
    buyerId,
    itemname,
    farmerId,
  });

  if (availableFarmersItem) {
    return res.status(400).json("Item already bid by you");
  } else {
    try {
      const newBidItem = new BidItem(req.body);
      const savedBidItem = await newBidItem.save();

      // Update farmer produce to take away the bid items(quantity)******************
      // try {
      //   const findFarmerAndUpdate = await FarmerProduce.findOneAndUpdate(
      //     {
      //       itemname,
      //       farmerId,
      //     },
      //     {
      //       $set: {
      //         itemquantity: itemquantity - quantitybuyerneeds,
      //       },
      //       new: true,
      //     }
      //   );
      //   console.log("Successfully updated farmer produce");

      //   // Update farmer specifics to take away the bid items(quantity)******************
      //   try {
      //     const findFarmerSpecificsAndUpdate =
      //       await FarmerSpecifics.findOneAndUpdate(
      //         {
      //           itemname,
      //           farmerId,
      //         },
      //         {
      //           $set: {
      //             itemquantity: itemquantity - quantitybuyerneeds,
      //           },
      //           new: true,
      //         }
      //       );

      //     // Update all produce to take away the bid items(quantity)******************
      //     try {
      //       const findAllProduceAndUpdate = await AllProduce.findOneAndUpdate(
      //         {
      //           itemname,
      //         },
      //         {
      //           $set: {
      //             itemquantity: itemquantity - quantitybuyerneeds,
      //           },
      //           new: true,
      //         }
      //       );
      //     } catch (err) {
      //       console.log(err, "Error occured updating all produce");
      //     }

      //     console.log("Successfully updated farmer specifics");
      //   } catch (err) {
      //     console.log(err, "Error occured updating farmer specifics");
      //   }
      // } catch (err) {
      //   console.log(err, "Error occured updating farmer produce");
      // }

      return res.status(200).json(savedBidItem);
    } catch (err) {
      console.log(err, "Error occured creating bid");
      return res.status(500).json(err);
    }
  }
});

// Update bid item ************************************************************
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await BidItem.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Item has been updated", updatedItem });
  } catch (err) {
    console.log(err);
    return res.status(500).json(res);
  }
});

// Get all bidItems of a partcular farmer's produce ***************************
router.get("/findbids/:farmerId/:itemname", async (req, res) => {
  try {
    const bidItems = await BidItem.find({
      farmerId: req.params.farmerId,
      itemname: req.params.itemname,
    })
      .sort({ buyerprice: -1, createdAt: -1 })
      .limit(5);
    return res.status(200).json(bidItems);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// GET ALL BIDS WHERE ACCEPTED PRICE AND ACCEPTED TIME IS NOT NULL *********************************
router.get("/findbids/acceptedones", async (req, res) => {
  try {
    const boughtItems = await BidItem.find({
      accepteddate: { $exists: true, $ne: null },
      acceptedtime: { $exists: true, $ne: null },
    });
    return res.status(200).json(boughtItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL BIDS WHERE ACCEPTED PRICE AND ACCEPTED TIME IS NOT NULL FOR A PARTICLUAR PRODUCE *********************************
router.get("/findbids/acceptedones/byitem/:itemname", async (req, res) => {
  try {
    const boughtItems = await BidItem.find({
      accepteddate: { $exists: true, $ne: null },
      acceptedtime: { $exists: true, $ne: null },
      itemname: req.params.itemname,
    });

    console.log(boughtItems, "found");
    console.log("found");

    return res.status(200).json(boughtItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
