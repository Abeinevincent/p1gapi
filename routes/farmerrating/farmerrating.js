const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const Rating = require("../../models/Rating");

// Create Rating
router.post("/", async (req, res) => {
  try {
    const ratingdetails = await Rating.findOne({
      buyerId: req.body.buyerId,
      farmerId: req.body.farmerId,
    });
    if (ratingdetails) {
      return res.status(400).json("You already rated this farmer");
    } else {
      const rating = new Rating(req.body);
      const savedRating = await rating.save();

      return res.status(200).json(savedRating);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S SINGLE RATING
router.get("/:ratingId", async (req, res) => {
  try {
    const ratings = await Rating.find({ _id: req.params.farmerId });
    res.status(200).json(ratings);
  } catch (err) {
    console.log(err);
  }
});

// GET A FARMER'S ALL RATINGS
router.get("/findfarmer/:farmerId", async (req, res) => {
  try {
    const ratings = await Rating.find({ farmerId: req.params.farmerId });
    res.status(200).json(ratings);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
