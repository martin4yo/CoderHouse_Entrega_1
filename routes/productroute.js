const express = require("express");
const router = express.Router();
const { getProducts, getProductById, updateProduct, addProduct, deleteProduct } = require("../controllers/productcontroller");

//Devuelve la lista de productos
router.get("/", getProducts);

//Devuelve un producto
router.get("/:id", getProductById);

//Devuelve un producto
router.delete("/:id", deleteProduct);

//Actualiza un producto
router.post("/", addProduct);

//Actualiza un producto
router.put("/", updateProduct);

module.exports = router;