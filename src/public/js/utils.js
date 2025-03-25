// Función para mostrar las alertas con bootstrap
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} mt-3`;
    alerta.textContent = mensaje;
    document.querySelector(".container").prepend(alerta); 
  
    // Timer para ver el alerta por X milisegundos
    setTimeout(() => {
        alerta.remove();
    }, 3000);
  }