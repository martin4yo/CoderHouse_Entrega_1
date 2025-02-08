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

const getProductById= (req, res) => {
  try {
    const pm = new ProductManager
    const {id} = req.params
    const product = pm.getProductById(id); 
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).send("No se encontró el producto");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const deleteProduct= (req, res) => {
  try {
    const pm = new ProductManager
    const {id} = req.params
    res.status(200).json(pm.deleteProduct(id));
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

const updateProduct= (req, res) => {
  try {
    const pm = new ProductManager
    const product = {...req.body}
    try {
      const updated_product = pm.updateProduct(product); 
      res.status(200).json(updated_product);
    }
    catch (error){
      res.status(400).send(`${error}`);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

const addProduct= (req, res) => {
  try {
    const pm = new ProductManager
    const product = {...req.body}
    try {
      const new_product = pm.addProduct(product); 
      res.status(200).json(new_product);
    }
    catch (error){
      res.status(400).send(`${error}`);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { getProducts, getProductById, updateProduct, addProduct, deleteProduct };
