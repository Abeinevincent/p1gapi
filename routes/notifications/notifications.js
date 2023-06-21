const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const Notifications = require("../../models/Notifications");

// Create notifications
router.post("/", async (req, res) => {
  try {
    const newNotifications = new Notifications(req.body);
    const savedNotification = await newNotifications.save();
    return res.status(200).json(savedNotification);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all notifications of a partcular farmer
router.get("/findfarmer/:farmerId", async (req, res) => {
  try {
    const notifications = await Notifications.find({
      farmerId: req.params.farmerId,
      sendTo: "Farmer",
    });
    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all notifications of a partcular buyer
router.get("/findbuyer/:buyerId", async (req, res) => {
  try {
    const notifications = await Notifications.find({
      buyerId: req.params.buyerId,
      sendTo: "Buyer",
    });
    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all notifications of a partcular buyer
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const notifications = await Notifications.find({
      _id: req.params.id,
    });
    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

module.exports = router;
