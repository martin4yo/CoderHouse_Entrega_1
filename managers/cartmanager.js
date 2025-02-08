const { Carts } = require('../db/carts.js');
const ProductManager = require('./productmanager.js');

class CartManager {

  constructor() {

    // Instancia el product manager 
    // para luego recuperar los datos de productos
    this.product_manager = new ProductManager

    // Instancia el cart manager para administrar los carritos
    this.carts_table = new Carts

    // Recupera la lista de carritos
    this.carts = this.carts_table.getCarts()

    // Define la propiedad donde se va a guardar el ultimo ID de carrito utilizado
    this.cart_id = 0;

    // Recorre la coleccion de carritos para buscar el maximo ID utilizado
    // porque se pueden haber borrado carritos intermedios y la cantidad de objetos
    // de la coleccion no indica el ultimo ID de carrito utilizado
    if (this.carts.length > 0){
      const max_id = Math.max(...this.carts.map(p => p.id));
      if (max_id) {
        this.cart_id = max_id;
      }
    } 


  }

  // Agrega un producto a un carrito 
  // si no se pasa ningun parametro se crea el cart vacio

  addCart() {

    try {
      // Carrito vacío
      const cart = {}

      // Incrementa el ID del carrito  
      this.cart_id++

      // Setea del nuevo carrito
      cart.id = this.cart_id

      // Agrega la coleccion de productos vacia
      cart.products = []

      // Agrega el nuevo carrito a la coleccion de carritos
      this.carts.push(cart)

      // Guarda el carrito
      this.carts_table.saveCarts(this.carts)

      return cart
    } catch (err) {
      throw new Error(`Al crear el nuevo carrito : ${err}`)
    }
   

  }

  // Agrega un producto a un carrito existente
  // Si la cantidad no se recibe como parametro agrega 1
  addProductToCart(cart_id, product_id, quantity) {

    try {

      // Busca el carrito por el ID
      const cart = this.getCartById(cart_id)

      if (!cart) {
        throw new Error(`El carrito ${cart_id} no existe`)
      }

      // Busca el producto por el id
      const new_product = this.product_manager.getProductById(product_id);

      if (!new_product) {
        throw new Error(`El producto ${product_id} no existe`)
      }

      // Busca en los productos del carrito el producto indicado
      let product = cart.products.find((p) => parseInt(p.product_id) === parseInt(product_id))

      // Si no se pasa cantidad lo pone en 1
      if (!quantity) {
        quantity = 1;
      }

      if (product) {
        // El producto ya esta en el carrito
        product.quantity = product.quantity + quantity
      }
      else {
        // El producto no esta en el carrito
        product = {};
        product.product_id = parseInt(product_id);
        product.quantity = quantity;
        cart.products.push(product);
      }

      if (parseInt(product.quantity) <= 0) {
        //Si la cantidad queda menor o igual a 0 entonces elimina el producto del carrito
        let productos_restantes = cart.products.filter((p) => p.product_id !== parseInt(product_id));
        console.log(cart);
        cart.products = productos_restantes;
      }

      // Modifique los carritos entonces guardo
      this.carts_table.saveCarts(this.carts)
      return cart

    } catch (err) {
      throw err;
    }

  }

  getCarts() {
    // Devuelve la coleccion de carritos completa
    return this.carts;
  }

  getCartById(id) {
    // Devuelve un carrito segun el ID
    const cart = this.carts.find((p) => p.id === parseInt(id));
    if (cart) {
      return cart
    }
    else {
      throw new Error(`El carrito ${id} no existe`);
    }

  }

  deleteCart(id) {
    try {

      // Filtra los carritos devolviendo todos menos el indicado
      let carts_filtrados = this.carts.filter((p) => p.id !== parseInt(id));

      // Guarda en la base la nueva lista de carritos
      this.table.saveProducts(carts_filtrados);

      // Actualiza la lista de carritos de memoroa
      this.carts = carts_filtrados;
      return `Carrito ${id} ha sido eliminado`
    }
    catch (err) {
      throw new Error(`Al eliminar el carrito ${id}, Error ${err}`)
    }

  }

}

module.exports = CartManager