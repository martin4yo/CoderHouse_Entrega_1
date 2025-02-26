const CartManager = require("../managers/cartmanager");

const getCarts= (req, res) => {
  try {
    //Instancia la clase CartManager para recuperar la lista de carritos completa del metodo correspondiente
    const cm = new CartManager
    const carts = cm.getCarts(); 
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error al obtener los carritos:", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};


const addCart= (req, res) => {
  try {
    //Instancia la clase CartManager para agregar un carrito vacio
    const cm = new CartManager
    res.status(200).json(cm.addCart());
  } catch (error) {
    console.error("Error al agregar un carrito :", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const getCartById= (req, res) => {
  try {
     //Instancia la clase CartManager para devolver un carrito por el ID
    const cm = new CartManager

    //Recupera de params el id
    const {id} = req.params

    //Obtiene el carrito
    const cart = cm.getCartById(id); 
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const addProduct= (req, res) => {
  try {
     //Instancia la clase CartManager para agregar un producto al carrito
    const cm = new CartManager

    //Deconstruye los 2 parametros que se requieren id de carrito y id de producto
    const {cid, pid} = req.params
    try {
      const cart = cm.addProductToCart(cid, pid)
      res.status(200).json(cart);
    } catch (err){
      console.log(err)
      res.status(400).json({success : false, message : err.message});
    }
    //Llama al metodo de CartManager para agregar el producto al carrito
    
  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

module.exports = { getCarts, getCartById, addCart, addProduct };
