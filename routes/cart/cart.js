const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const Cart = require("../../models/Cart");

// Create cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCard = await newCart.save();
    return res.status(200).json(savedCard);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all items in a cart of a partcular buyer
router.post("findall/buyerId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get a single cart by id
router.post("/id", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

module.exports = router;
