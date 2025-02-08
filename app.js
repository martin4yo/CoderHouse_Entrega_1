const express = require("express");
const app = express();
var logger = require("morgan");

// MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// CORS CONFIG - DOMINIOS que pueden acceder a esta API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //* Definiendo una lista de dominios permitidos
  /*
  const origin = req.headers.origin;
  // Define los dominios permitidos
  const allowedOrigins = ["http://localhost:5173","http://localhost:5174"];
  // Verifica si el origen de la solicitud está en la lista de dominios permitidos
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  */
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//* ENDPOINTS - estamos MODULARIZANDO ROUTE
const routes = require("./routes/index");
app.use("/", routes);

// app.get("/books", (req, res) => {}); //* GET 'api/books' => ya modularizada
/*
//* SIN MODULARIZAR
app.get("/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = books.find((book) => book.id === parseInt(id));
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).send("Error interno del servidor");
  }
});

//* DELETE '/books/delete-book' => id por query
app.delete("/books/delete-book", (req, res) => {
  try {
    const { id } = req.query;
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      res.status(200).send("Libro eliminado");
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).send("Error interno del servidor");
  }
});

//* POST '/books' => datos por body { "title": "papapa", "author": "Pepe", "year": 1990 }
app.post("/books", (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = {
      id: books.length + 1,
      title,
      author,
      year,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error al agregar el libro:", error);
    res.status(500).send("Error interno del servidor");
  }
});

//* PUT '/books/update-book' => id por query y datos por body
app.put("/books/update-book", (req, res) => {
  try {
    const { id } = req.query;
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res.status(400).send("Faltan datos");
    }
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));
    if (bookIndex !== -1) {
      //* -1 si no lo encuentra y la posición si lo encuentra
      books[bookIndex] = {
        id: parseInt(id),
        title,
        author,
        year,
      };
      res.status(200).json(books[bookIndex]);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).send("Error interno del servidor");
  }
});

/*
! IMPORTANTE - evitar nombres de rutas simples y reiterativamente para evitar
! las respuestas dobles

app.get("/users", ()=>{})
app.post("/users", ()=>{})
app.put("/users", ()=>{})
app.delete("/users", ()=>{})


app.post("/users", ()=>{})

*/


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
