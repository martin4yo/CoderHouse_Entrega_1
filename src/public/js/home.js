// Funciones para la paginación
function goToPage(link) {

    if (link !== '') {
        // Convertir el string en un objeto URLSearchParams
        let params = new URLSearchParams(link);

        // Modificar el valor de 'limit'
        const limit = document.getElementById('linesPerPage');
        params.set('limit', limit.value);

        // Obtener el nuevo string con los cambios
        let newQueryString = params.toString();

        // Crear la nueva URL con el parámetro actualizado
        const newUrl = window.location.pathname + '?' + newQueryString;

        // Redirigir a la misma página con el nuevo valor de 'page'
        window.location.href = newUrl;
    }
    
}

function updateLimit(newLimit) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('limit', newLimit); // Cambia el valor de limit
    window.location.search = urlParams.toString(); // Recarga la página con el nuevo parámetro
}

    function applyFilter() {

    // Recupera la cadena query actual
    const urlParams = new URLSearchParams(window.location.search);

    // Recupera el valor del campo a filtrar
    const field = document.getElementById('filterField');
    const text = document.getElementById('filterText');
    const order = document.getElementById('orderType');

    urlParams.set('field', field.value); // Cambia el valor de limit
    urlParams.set('text', text.value); // Cambia el valor de limit
    urlParams.set('order', order.value); // Cambia el valor de limit
    urlParams.set('page', 1); // Cambia el valor de limit

    window.location.search = urlParams.toString(); // Recarga la página con el nuevo parámetro

}


//Enviar los datos para el ALTA del producto en el carrito**************

function addProduct(id) {

    const cart_id = document.getElementById("cartId").value

    // URL de la API
    const apiUrl = `http://localhost:8080/api/carts/${cart_id}/product/${id}`;

    // Configuración del POST
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
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
    })
    .catch(error => {
        // Si el producto no pudo ser agregado
        mostrarAlerta("Error al agregar el producto", "danger"); 
    });

}

// document.getElementById("productForm").addEventListener("submit", function(event) {
//     event.preventDefault(); 
  
//     // Recupero los datos del formulario para enviar a la API con el POST
//     const productData = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         code: document.getElementById("code").value,
//         price: parseFloat(document.getElementById("price").value),
//         stock: parseInt(document.getElementById("stock").value),
//         status: document.getElementById("status").value === "true", 
//         category: document.getElementById("category").value,
//         thumbnails: document.getElementById("thumbnails").value
//     };
  
//     // URL de la API
//     const apiUrl = "http://localhost:8080/api/products"; 
  
//     // Configuración del POST
//     fetch(apiUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(productData) 
//     })
//     .then(response => {
//         if (!response.ok) {  // Si la respuesta no fue satisfactoria
//             throw new Error("Error al agregar el producto");
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Si el producto pudo ser agregado
//         mostrarAlerta("Producto agregado correctamente", "success"); 
//         document.getElementById("productForm").reset(); 
//     })
//     .catch(error => {
//         // Si el producto no pudo ser agregado
//         mostrarAlerta("Error al agregar el producto", "danger"); 
//     });
//   });