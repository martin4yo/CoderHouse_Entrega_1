const CartManager = require("../managers/cartmanager");

const getCarts= (req, res) => {
  try {
    const cm = new CartManager
    const carts = cm.getCarts(); 
    if (carts) {
      res.status(200).json(carts);
    } else {
      res.status(400).send("No se encontraron carritos activos");
    }
  } catch (error) {
    console.error("Error al obtener los carritos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const getCartById= (req, res) => {
  try {
    const cm = new CartManager
    const {id} = req.params
    const cart = cm.getCartById(id); 
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(400).send("No se encontró el carrito");
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { getCarts, getCartById };
