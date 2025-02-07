const CartManager = require("./cartmanager")

const listacarts = new CartManager

//console.log(listacarts.addProduct(4, 10, 1))
//console.log(listacarts.addProduct(1, 20, 1))
//console.log(listacarts.addProduct(4, 30, 1))
//console.log(listacarts.addProduct(5, 20))
console.log(listacarts.getCartById(2))
//console.log(listaproductos.deleteProduct(2))
//console.log(listaproductos.deleteProduct(3))
//console.log(listaproductos.getProducts())

console.log(JSON.stringify(listacarts.getCarts()))