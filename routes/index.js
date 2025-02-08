const express = require("express");
const router = express.Router();
const products = require("./productroute");
const carts = require("./cartroute");

/* Home */
router.get("/", function (req, res, next) {
  res.send(
    `<div style='text-align: center; margin-top: 20%; font-size: 2em; font-family: Arial;'>
    <h1>¡Bienvenido a la API de eCommerce!</h1>
    <p>Para ver los productos, ve a <a href="http://localhost:8080/api/products">/products</a></p>
    </div>`
  );
});

//Importa las rutas de products
router.use("/api/products", products);

//Importa las rutas de carts
router.use("/api/carts", carts);

module.exports = router;
