const ProductManager = require("../managers/productmanager");

const getProducts= (req, res) => {
  try {
    const pm = new ProductManager
    const products = pm.getProducts(); 
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(400).send("No se encontraron productos");
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { getProducts };
