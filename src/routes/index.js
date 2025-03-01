const express = require("express");
const router = express.Router();
const products = require("./productroute");
const carts = require("./cartroute");
const views = require("./viewsroute");

/* Home */
router.get("/", function (req, res, next) {
  res.render("index");
});

//Importa las rutas de products
router.use("/api/products", products);

//Importa las rutas de carts
router.use("/api/carts", carts);

//Importa las rutas de vistas
router.use("/", views);

module.exports = router;
