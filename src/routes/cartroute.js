const express = require("express");
const router = express.Router();
const { getCarts, getCartById, addCart, addProduct, deleteCart, deleteProduct, addProducts, updateProduct } = require("../controllers/cartcontroller");

//Devuelve todos los carritos
router.get("/", getCarts);

//Devuelve el carrito id
router.get("/:id", getCartById);

//Agrega carrito vacio
router.post("/", addCart);

//Agrega un producto - Cantidad 1
router.post("/:cid/product/:pid", addProduct);

//Modifica un producto del carrito por id y reemplaza la cantidad
router.put("/:cid/product/:pid", async (req, res) => {
    await updateProduct(req, res);
}
);

//Agrega una lista de productos al carrito
router.put("/:id", async (req, res) => {
    await addProducts(req, res);
}
);

//Elimina un producto del carrito por id
router.delete("/:cid/product/:pid", async (req, res) => {
    await deleteProduct(req, res);
}
);

//Elimina un carrito por id
router.delete("/:id", async (req, res) => {
    await deleteCart(req, res);
}
);

module.exports = router;