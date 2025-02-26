//* CLIENT
console.log("IN CLIENT");

const userName = document.querySelector(".userName");
const chatMessage = document.querySelector(".chatMessage");
var uuid = "";

//* Conexión con el servidor de Socket.IO
// const socket = io("http://mi-server-aparte.com")
const socket = io("http://localhost:8080");

//* Lista de productos a renderizar en el chat
var products = [];

//* Función para actualizar los mensajes en el chat
const updateProducts = (products) => {
  products = [...products.data];
  let resultado = '<ul>'
  resultado += products
    .map((product) => {
        return `
        <li>${product.code} - ${product.title} - $${product.price}</li>
      `;
      }
  )
    .join("");
  chatMessage.innerHTML = resultado + '</ul>'
};

// //* Formulario de entrada de usuario con SweetAlert2
// // Mostrar el formulario de entrada de usuario
// Swal.fire({
//   title: "Ingrese su información",
//   html: `
//         <input type="text" id="swal-input-name" class="swal2-input" placeholder="Nombre">
//         <input type="text" id="swal-input-id" class="swal2-input" placeholder="ID">
//       `,
//   focusConfirm: false,
//   showCancelButton: true,
//   confirmButtonText: "Ingresar",
//   preConfirm: () => {
//     const name = Swal.getPopup().querySelector("#swal-input-name").value;
//     const id = Swal.getPopup().querySelector("#swal-input-id").value;
//     if (!name || !id) {
//       Swal.showValidationMessage(`Por favor ingrese ambos campos`);
//     }
//     return { name: name, id: id };
//   },
// }).then((result) => {
//   console.log("-->", result);
//   const { name, id } = result.value;
//   uuid = id;
//   if (result.isConfirmed) {
//     userName.textContent = name;
//     socket.emit(`userConnect`, { user: name, id });
//   }
// });

socket.emit('userConnect');

//* Evento de conexión con el servidor
socket.on("serverUserMessage", (data) => {
  updateProducts(data);
});

// //* Enlace de eventos de los botones de la interfaz - al DOM
// const btnMessage = document.getElementById("btnMessage");
// const inputMessage = document.getElementById("inputMessage");

// //* Función para enviar un mensaje al servidor
// btnMessage.addEventListener("click", (e) => {
//   e.preventDefault();
//   const message = inputMessage.value;
//   socket.emit("userMessage", { message, user: userName.innerHTML });
// });

//* Evento para escuchar mensajes nuevos del servidor y actualizar la lista de mensajes

/*
Los eventos de Socket.IO son asíncronos, lo que significa que no podemos detener el flujo 
de la aplicación esperando una respuesta directa. 
Para manejar esto, podemos:

1. Usar callbacks proporcionados por el cliente o el servidor.
2. Emitir eventos personalizados y escuchar las respuestas por separado.

Esto permite que el flujo de la aplicación continúe mientras se gestionan las respuestas.
*/
