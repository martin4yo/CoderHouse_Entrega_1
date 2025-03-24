// RUTAS PARA LAS VISTAS
//Ruta para acceder a la vista de productos publicados
const express = require("express");
const router = express.Router();
const axios = require('axios');
const ProductManager = require("../managers/productmanager");
const pm = new ProductManager

router.get("/home", async (req, res) => {
    try {
      const result = await pm.getProducts(req); 
      res.render("home", { result });
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