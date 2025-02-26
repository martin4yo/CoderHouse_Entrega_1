const app = require("./app");
const axios = require('axios');

const PORT = 8080;
const displayRoutes = require("express-routemap");


const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Server listening on port http://localhost:${PORT}`);
});


//* Configuracion de socket.io. *****************************
const { Server } = require("socket.io");
const io = new Server(server);

//* Guardo la variable IO para usarla en las vistas
app.set("io", io);

//* Lista de mensajes que se guardan en el servidor (simulando una base de datos)
const messages = [];

//* Evento de conexión - Cada que se conecta un client se ejecuta su function CB
io.on("connection", (socket)=>{

  socket.on("userConnect", async (data)=>{

      const response = await axios.get('http://localhost:8080/api/products/');
      const products = response.data
      io.emit("serverUserMessage", {info : "lista",
                                    data : products})
  })

  socket.on("disconnect", (data)=>{
    console.log("----> ", data) // transport close
    console.log("Cliente desconectado:", socket.id);
  })
})

// app.listen(PORT, () => {
//   displayRoutes(app);
//   console.log(`Server listening on port http://localhost:${PORT}`);
// });
