//* Seccion de la vista que muestra la lista de productos
const productRows = document.querySelector(".product_list");


//* Conexión con el servidor de Socket.IO
const socket = io("http://localhost:8080");


//* Muestra todos los productos en la lista
const updateProducts = (products) => {
  products = [...products.data];
  let resultado = `
  <table class="table table-bordered">
        <thead>
            <tr>
                <th colspan="4" class="text-center bg-darkcyan">Productos RealTime</th>
            </tr>
        </thead>
        <thead class="table-primary">
            <tr>
            <th>Id</th>
            <th>Codigo</th>
            <th>Descripcion</th>
            <th class="text-end">Precio</th>
            </tr>
        </thead>
        <tbody>          
  `
  resultado += products
    .map((product) => {
        return `
        <tr>
            <td>${product.id}</td>
            <td>${product.code}</td>
            <td>${product.title}</td>
            <td class="text-end">$${product.price}</td>
            </tr>
      `;
      }
  )
    .join("");
    productRows.innerHTML = resultado +  `</tbody>
    </table>`
};

socket.emit('getProducts');

//* Evento de conexión con el servidor
socket.on("showProducts", (data) => {
  updateProducts(data);
});