const ProductManager = require("./productmanager")

const listaproductos = new ProductManager

/*
let producto = {
    "title" : "Pan de Salvado", 
    "descripcion" : "Pan Salvado", 
    "code" : "P002", 
    "price" : 130, 
    "status" : true, 
    "stock" : 300, 
    "category" : "Panificado", 
    "thumbnails" : ""
}
listaproductos.addProduct(producto)

producto = {
    "title" : "Tomate Redondo", 
    "descripcion" : "Tomate redondo rojo de granja", 
    "code" : "T001", 
    "price" : 1340, 
    "status" : true, 
    "stock" : 200, 
    "category" : "Verduras", 
    "thumbnails" : ""
}
listaproductos.addProduct(producto)

producto = {
    "title" : "Milanesa de Soja", 
    "descripcion" : "Milanesa rebozada de soja con jamon y queso", 
    "code" : "M001", 
    "price" : 3234, 
    "status" : true, 
    "stock" : 220, 
    "category" : "Minutas", 
    "thumbnails" : ""
}
listaproductos.addProduct(producto)
*/

// producto = {
//     "id" : 5, 
//     "title" : "Milanesa de Pollo",
//     "category" : "Milangas"
// }
// listaproductos.updateProduct(producto)

console.log(listaproductos.getProducts())
//console.log(listaproductos.getProductById(2))
//console.log(listaproductos.deleteProduct(2))
//console.log(listaproductos.deleteProduct(3))
//console.log(listaproductos.getProducts())