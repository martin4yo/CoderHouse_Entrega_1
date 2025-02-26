const CartManager = require("./cartmanager")

const listacarts = new CartManager

//console.log(listacarts.addCart())
//console.log(listacarts.addProduct(4, 10, 1))
//console.log(listacarts.addProduct(1, 20, 1))
//console.log(listacarts.addProduct(4, 30, 1))
console.log(listacarts.addProductToCart(1, 45, -1))
console.log(listacarts.getCart(5))
//console.log(listaproductos.deleteProduct(2))
//console.log(listaproductos.deleteProduct(3))
//console.log(listaproductos.getProducts())
//console.log(listacarts.getCarts())