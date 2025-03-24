const express = require("express");
const router = express.Router();
const { getProducts, getProductById, updateProduct, addProduct, deleteProduct } = require("../controllers/productcontroller");
const ProductManager = require("../managers/productmanager");
const pm = new ProductManager

const updateClientView = async (req) => {
  //Dispara el evento para mostrar los productos en el cliente

  const products = await pm.getProducts(req);
  const io = req.app.get("io"); 
  if (io) {
    io.emit("showProducts", {info : "lista",
                                data : products})
  }
}

//Devuelve la lista de productos
router.get("/", async (req, res) => {
  await getProducts(req, res);
});

//Devuelve un producto
router.get("/:id", getProductById);

//Elimina un producto
router.delete("/:id", async (req, res) => {
    await deleteProduct(req, res);
    updateClientView(req)
}
);

//Agrega un producto
router.post("/", async (req, res) => {
    await addProduct(req, res);
    updateClientView(req)
});

//Actualiza un producto
router.put("/:id", async (req, res) => {
    await updateProduct(req, res);
    updateClientView(req)
});

module.exports = router;