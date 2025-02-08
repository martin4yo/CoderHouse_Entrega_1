const ProductManager = require("../managers/productmanager");

const getProducts = (req, res) => {
  try {
    //Instancia la clase ProductManager para recuperar la lista de productos completa
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

const getProductById = (req, res) => {
  try {
    //Instancia la clase ProductManager para recuperar un producto por ID
    const pm = new ProductManager
    const { id } = req.params
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

const deleteProduct = (req, res) => {
  try {
    //Instancia la clase ProductManager para eliminar el producto
    const pm = new ProductManager
    const { id } = req.params
    res.status(200).json(pm.deleteProduct(id));
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

const updateProduct = (req, res) => {
  try {
    //Instancia la clase ProductManager para actualizar el producto
    const pm = new ProductManager

    //Construye el json con los datos a actualizar desde el body
    const product = { ...req.body }
    try {

      //Llama al metodo de ProductManager para actualizar el producto
      const updated_product = pm.updateProduct(product);
      res.status(200).json(updated_product);
    }
    catch (error) {
      res.status(400).send(`${error}`);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

const addProduct = (req, res) => {
  try {
    //Instancia la clase ProductManager para crear el producto
    const pm = new ProductManager

    //Construye el json con los datos a actualizar desde el body
    const product = { ...req.body }
    try {

      //Llama al metodo que agrega el producto
      const new_product = pm.addProduct(product);
      res.status(200).json(new_product);
    }
    catch (error) {
      res.status(400).send(`${error}`);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { getProducts, getProductById, updateProduct, addProduct, deleteProduct };
