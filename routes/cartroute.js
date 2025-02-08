const express = require("express");
const router = express.Router();
const { getCarts } = require("../controllers/cartcontroller");

router.get("/", getCarts);

module.exports = router;