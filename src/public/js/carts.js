//Enviar los datos para eliminar el producto del carrito**************

function deleteProductFromCart(product_id) {

    const cart_id = document.getElementById('cart_id').value;

    // URL de la API
    const apiUrl = `http://localhost:8080/api/carts/${cart_id}/product/${product_id}`;

    // Configuración del POST
    fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {  // Si la respuesta no fue satisfactoria
            throw new Error("Error al eliminar el producto");
        }
        return response.json();
    })
    .then(data => {
        // Si el producto pudo ser agregado
        mostrarAlerta("Producto eliminado correctamente", "success");
        location.reload();
    })
    .catch(error => {
        // Si el producto no pudo ser agregado
        mostrarAlerta("Error al eliminar el producto", "danger"); 
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