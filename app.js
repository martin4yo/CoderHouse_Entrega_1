const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const axios = require('axios');

var logger = require("morgan");

// MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// CORS CONFIG - DOMINIOS que pueden acceder a esta API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// CONFIGURACION DE HANDLEBARS 
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/static", express.static(path.join(__dirname, "./src/public")));

//Renderizar la lista de productos 
app.get("/", async (req, res) => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/');
      const products = response.data
      res.render("home", { products });
    } 
    catch (err) {
      res.render("error", { error : err.message })
    }
  });

//Renderizar la lista de productos 
app.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } 
  catch (err) {
    res.render("error", { error : err.message })
  }
});
  
// CONFIGURACION DE RUTAS 

const routes = require("./src/routes/index");
app.use("/", routes);

//* Route not found
app.use((req, res) => {
  res.status(404).send(
    `<div style='text-align: center; font-family: Arial;'>
          <h1>404 Not Found</h1>
          <p>La ruta solicitada no existe</p>
        </div>`
  );
});

module.exports = app;
