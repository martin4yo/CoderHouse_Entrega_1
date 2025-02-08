const express = require("express");
const router = express.Router();
const { getCarts, getCartById } = require("../controllers/cartcontroller");

//Devuelve todos los carritos
router.get("/", getCarts);

//Devuelve el carrito id
router.get("/:id", getCartById);

module.exports = router;