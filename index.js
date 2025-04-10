const app = require("./app");
const axios = require('axios');
const ProductManager = require("./src/managers/productmanager");
const pm = new ProductManager

const PORT = 8080;
const displayRoutes = require("express-routemap");


const http = require("http");
const server = http.createServer(app);

server.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Server listening on port http://localhost:${PORT}`);
});


//* Configuracion de socket.io. 
const { Server } = require("socket.io");
const io = new Server(server);

//* Guardo la variable IO para usarla en las vistas
app.set("io", io);

//* Inicializo el socket y defino un solo evento para mostrar los productos 
io.on("connection", (socket)=>{
  
  socket.on("getProducts", async (data)=>{

      const result = await pm.getProducts();
      io.emit("showProducts", {info : "lista",
                                    data : result})
  })

})

