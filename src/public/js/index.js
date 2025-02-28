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
                <th colspan="5" class="text-center bg-darkcyan">Productos RealTime</th>
            </tr>
        </thead>
        <thead class="table-primary">
            <tr>
            <th class="align-middle text-center">Id</th>
            <th class="align-middle text-center">Codigo</th>
            <th class="align-middle text-center">Descripcion</th>
            <th class="align-middle text-end">Precio</th>
            <th>Accion</th>
            </tr>
        </thead>
        <tbody>          
  `
  resultado += products
    .map((product) => {
        return `
        <tr>
            <td class="align-middle text-center">${product.id}</td>
            <td class="align-middle text-center">${product.code}</td>
            <td class="align-middle text-center">${product.title}</td>
            <td class="align-middle text-end">$${product.price}</td>
            <td class="align-middle text-center w-30">
              <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                      <i class="bi bi-trash"></i> Eliminar
              </button>
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

//* Funcion para llamar a la API que elimina
function deleteProduct(productId) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      console.log("Eliminando producto con ID:", productId);
      
      fetch(`http://localhost:8080/api/products/${productId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al eliminar el producto");
        }
        return response.json(); // Si la API devuelve respuesta JSON
    })
    .then(data => {
        console.log("Producto eliminado correctamente:", data);
        alert("Producto eliminado exitosamente");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al eliminar el producto");
    });

  }
}