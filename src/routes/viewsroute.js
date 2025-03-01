// RUTAS PARA LAS VISTAS
//Ruta para acceder a la vista de productos publicados
const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/home", async (req, res) => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/');
      const products = response.data
      res.render("home", { products });
    } 
    catch (err) {
      res.render("error", { error : err.message })
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