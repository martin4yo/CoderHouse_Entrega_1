//* Seccion de la vista que muestra la lista de productos
const productRows = document.querySelector(".product_list");

//* Conexión con el servidor de Socket.IO
const socket = io("http://localhost:8080");


//* Muestra todos los productos en la lista
const updateProducts = (result) => {
    const products = result.data.payload;
    let resultado = `
    <table class="table table-bordered">
            <thead>
                <tr>
                    <th colspan="5" class="text-center bg-darkcyan">Productos RealTime</th>
                </tr>
            </thead>
            <thead class="table-primary">
                <tr>
                <th class="align-middle text-center">Codigo</th>
                <th class="align-middle text-center">Titulo</th>
                <th class="align-middle text-start">Descripcion</th>
                <th class="align-middle text-end">Precio</th>
                <th class="align-middle text-center">Accion</th>
                </tr>
            </thead>
            <tbody>          
    `
    resultado += products
        .map((product) => {
            return `
            <tr>
                <td class="align-middle text-center">${product.code}</td>
                <td class="align-middle text-start">${product.title}</td>
                <td class="align-middle text-start">${product.description}</td>
                <td class="align-middle text-end">$${product.price}</td>
                <td class="align-middle text-center w-30">
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-danger" onclick="confirmDelete('${product._id}', '${product.title}')" data-bs-toggle="tooltip" title="Eliminar producto">
                            <i class="bi bi-trash"></i> <!-- Icono del tacho de basura -->
                        </button>
                    </div>
                </td>
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
socket.on("showProducts", (result) => {
  updateProducts(result);
});

// Confirmacion de Delete de BOOTSTRAP 

let itemIdToDelete = null;
let pTitleToDelete = null;

function confirmDelete(itemId, pTitle) {
    itemIdToDelete = itemId;
    pTitleToDelete = document.getElementById('pTitleToDelete');
    pTitleToDelete.innerHTML = `Elimina ${pTitle}?` 
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (itemIdToDelete !== null) {
          fetch(`http://localhost:8080/api/products/${itemIdToDelete}/`, {  //Llamo a la API con el metodo para eliminar
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {         //Verifico si la respuesta no fue satisfactoria
                throw new Error("Error al eliminar el producto");
            }
            return response.json(); 
        })
        .then(data => {
            // El producto pudo ser eliminado
            mostrarAlerta("Producto eliminado correctamente", "success"); 
        })
        .catch(error => {
            // Hubo algun error en el proceso
            console.error("Error:", error);
            mostrarAlerta("Se produjo un error al eliminar el producto", "danger"); 
        });
    }
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
});

//Enviar los datos para el ALTA del producto **************

document.getElementById("productForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  // Recupero los datos del formulario para enviar a la API con el POST
  const productData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      code: document.getElementById("code").value,
      price: parseFloat(document.getElementById("price").value),
      stock: parseInt(document.getElementById("stock").value),
      status: document.getElementById("status").value === "true", 
      category: document.getElementById("category").value,
      thumbnails: document.getElementById("thumbnails").value
  };

  // URL de la API
  const apiUrl = "http://localhost:8080/api/products"; 

  // Configuración del POST
  fetch(apiUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(productData) 
  })
  .then(response => {
      if (!response.ok) {  // Si la respuesta no fue satisfactoria
          throw new Error("Error al agregar el producto");
      }
      return response.json();
  })
  .then(data => {
      // Si el producto pudo ser agregado
      mostrarAlerta("Producto agregado correctamente", "success"); 
      document.getElementById("productForm").reset(); 
  })
  .catch(error => {
      // Si el producto no pudo ser agregado
      mostrarAlerta("Error al agregar el producto", "danger"); 
  });
});


