const express = require("express");
const router = express.Router();
const products = require("./productroute");
const carts = require("./cartroute");

/* Home */
router.get("/", function (req, res, next) {
  res.render("index");
});

//Importa las rutas de products
router.use("/api/products", products);

//Importa las rutas de carts
router.use("/api/carts", carts);

module.exports = router;
