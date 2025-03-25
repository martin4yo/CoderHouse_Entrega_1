// RUTAS PARA LAS VISTAS
//Ruta para acceder a la vista de productos publicados
const express = require("express");
const router = express.Router();
const axios = require('axios');
const ProductManager = require("../managers/productmanager");
const pm = new ProductManager
const CartManager = require("../managers/cartmanager");
const cm = new CartManager

router.get("/home", async (req, res) => {
    try {
      
      const result = await pm.getProducts(req); 
      const carts = await cm.getCarts();

      res.render("home", { result, carts });
    } 
    catch (error) {
      res.render("error", { error : error.message })
    }
  });

  router.get("/product/:id", async (req, res) => {
    try {

      const { id } = req.params
      const product = await pm.getProductById(id); 

      const carts = await cm.getCarts(); 

      res.render("product", { product, carts });
    } 
    catch (error) {
      res.render("error", { error : error.message })
    }
  });

  router.get("/cart/:id", async (req, res) => {
    try {

      const { id } = req.params
      const cart = await cm.getCartById(id); 
      res.render("cart", { cart, cart_id : id });
    } 
    catch (error) {
      res.render("error", { error : error.message })
    }
  });

  router.get("/carts", async (req, res) => {
    try {

      const { cart_id } = req.query
      let cart = {}

      if (cart_id){
          cart = await cm.getCartById(cart_id); 
      }

      const carts = await cm.getCarts(); 

      res.render("carts", { carts, cart, cart_id });
    } 
    catch (error) {
      res.render("error", { error : error.message })
    }
  });

//Ruta para acceder a la vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } 
  catch (err) {
    res.render("error", { error : err.message })
  }
});
  
module.exports = router;