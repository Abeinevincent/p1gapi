const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const Visitor = require("../../models/Visitor");

// Create Visitor
router.post("/", verifyToken, async (req, res) => {
  try {
    const visitordetails = await Visitor.findOne({
      visitorId: req.body.visitorId,
      farmerId: req.body.farmerId,
    });

    if (visitordetails) {
      return res.status(400).json("Visitor already counted");
    } else {
      const visitor = new Visitor({
        farmerId: req.body.farmerId,
        visitorId: req.body.visitorId,
      });

      const savedVisitor = await visitor.save();

      return res.status(200).json(savedVisitor);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S VISITORS
router.get("/:farmerId", verifyToken, async (req, res) => {
  try {
    const visitors = await Visitor.find({ farmerId: req.params.farmerId });
    res.status(200).json(visitors);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
