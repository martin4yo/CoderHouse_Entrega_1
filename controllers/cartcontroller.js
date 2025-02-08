const CartManager = require("../managers/cartmanager");

const getCarts= (req, res) => {
  try {
    const pm = new CartManager
    const carts = pm.getCarts(); 
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

module.exports = { getCarts };
