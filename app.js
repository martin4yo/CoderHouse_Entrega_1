const express = require("express");
const mongoose = require("mongoose");

const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

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
// CONFIGURACIÓN DE HANDLEBARS CON HELPER
const hbs = exphbs.create({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, 'src/views/partials'), // Aquí se registran los partials
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  },
  helpers: {
    eq: (a, b) => a === b, // Helper para comparar valores en Handlebars
    isEmptyArray: function (array) {
      return !array || array.length === 0;
    },
  }
});
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/static", express.static(path.join(__dirname, "./src/public")));


// CONFIGURACION DE MONGO ATLAS
mongoose.connect("mongodb+srv://martin4yo:fEufebvdIPb9peNn@cluster0.bn8aq.mongodb.net/codershop?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("Conexión a la base de datos establecida");
})
.catch((err) => {
  console.log("Error al conectar a la base de datos", err);
});

// CONFIGURACION DE RUTAS DE LA API y VISTAS
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
