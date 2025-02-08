const express = require("express");
const router = express.Router();
const { getCarts, getCartById, addCart, addProduct } = require("../controllers/cartcontroller");

//Devuelve todos los carritos
router.get("/", getCarts);

//Devuelve el carrito id
router.get("/:id", getCartById);

//Devuelve el carrito id
router.post("/", addCart);

//Devuelve el carrito id
router.post("/:cid/product/:pid", addProduct);

module.exports = router;