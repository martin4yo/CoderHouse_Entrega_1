const CartManager = require("../managers/cartmanager");
const cm = new CartManager

const getCarts= async (req, res) => {
  try {
    //Instancia la clase CartManager para recuperar la lista de carritos completa del metodo correspondiente
    const carts = await cm.getCarts(); 
    res.status(200).send({success : true, message : carts});
  } catch (error) {
    console.error("Error al obtener los carritos:", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const addCart= async (req, res) => {
  try {
    const cart = await cm.addCart()
    res.status(200).send({success : true, message : "Carrito vacío creado exitosamente!"});
  } catch (error) {
    console.error("Error al agregar un carrito :", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const getCartById= async (req, res) => {
  try {
    //Recupera de params el id
    const {id} = req.params

    if (!id) {
      res.status(400).send({success : false, message : "ID de carrito no proporcionado"}); 
      return;
    }

    //Obtiene el carrito
    const cart = await cm.getCartById(id); 
    res.status(200).send({success : true, message : cart});
  } catch (error) {
    res.status(500).send({success : false, message : error.message});
  }
};

const addProduct = async (req, res) => {
  try {
    //Deconstruye los 2 parametros que se requieren id de carrito y id de producto
    const {cid, pid} = req.params
    try {
      const cart = await cm.addProductToCart(cid, pid, 1, false)
      res.status(200).send({success : false, message : cart});
    } catch (err){
      res.status(400).send({success : false, message : err.message});
    }

  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const updateProduct = async (req, res) => {
    const { cid, pid} = req.params
    const { quantity } = req.body
    try {
      //Deconstruye los 2 parametros que se requieren id de carrito y id de producto
      const {cid, pid} = req.params
      try {
        const cart = await cm.addProductToCart(cid, pid, quantity, true)
        res.status(200).send({success : false, message : cart});
      } catch (err){
        res.status(400).send({success : false, message : err.message});
      }
  
    } catch (error) {
      res.status(500).send({success : false, message : "Error interno del servidor"});
    }
}

const addProducts = async (req, res) => {
  try {
    //Deconstruye el id del carrito
    const { id } = req.params

    //Recupera el body con la lista de productos
    const products = req.body

    try {
      const cart = await cm.addProductsToCart(id, products)
      res.status(200).send({success : false, message : cart});
    } catch (err){
      res.status(400).send({success : false, message : err.message});
    }

  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const deleteProduct = async (req, res) => {
  try {
    //Deconstruye los 2 parametros que se requieren id de carrito y id de producto
    const {cid, pid} = req.params
    try {
      const cart = await cm.deleteProductFromCart(cid, pid)
      res.status(200).send({success : true, message : cart});

    } catch (err){
      res.status(400).send({success : false, message : err.message});
    }

  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const deleteCart = async (req, res) => {
  try {

    const { id } = req.params
    
    if (!id) {
      res.status(400).send({success : false, message : "ID de carrito no proporcionado"}); 
      return;
    }

    const deleted_cart = await cm.deleteCart(id)

    if (!deleted_cart) {
      res.status(200).send({success : true, message : "El carrito ha sido eliminado"});
    } else {
      res.status(200).send({success : true, message : "Los productos del carrito han sido eliminados"});
    }
    return;
    
  } catch (error) {
    res.status(500).send({success : false, message : error.message});
  }

};

module.exports = { getCarts, getCartById, addCart, addProduct, deleteCart, deleteProduct, addProducts, updateProduct };
