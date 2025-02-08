const { Carts } = require('../db/carts.js');
const { Products } = require('../db/products.js');

class CartManager {

    constructor() {
    
    this.products_table = new Products
    
    this.products = this.products_table.getProducts()
    this.carts_table = new Carts

    this.carts = this.carts_table.getCarts()
    this.cart_id = this.carts.length;

    const max_id = Math.max(...carts.map(p => p.id));
    if (max_id){
          this.cart_id = max_id;
        }


    }      

    // Agrega un cart, 
    // si el cart tiene el mismo codigo o descripcion que uno existente da un error
    // si falta algun dato da un error
    //    title, descripcion, code, price, status, stock, category, thumbnails

    addProduct(new_product_id, quantity, cart_id){

      try {

          const product = this.products.find((p)=>p.id === parseInt(new_product_id));
                    
          if (!product){
              return `El producto con el id ${new_product_id} no existe`
          }
          
          const cart = this.carts.find((c)=>c.id === parseInt(cart_id));

          // Variable que contiene que mensaje se envia en la consola 
          let msg = "agregado al"

          if (!cart) {
 
            // Incrementa el ID del carrito  
            this.cart_id++

            // Setea el id en esta variable para informarla despues
            cart_id = this.cart_id
            let new_cart = {
              "id" : this.cart_id,
              "products" : [
                          {                  
                            "product_id" : new_product_id,
                            "quantity" : quantity
                          }
                        ]
            }           
            this.carts.push(new_cart)

            }
          else
            {

              // Recupera los productos del carrito
              let productos = cart.products 

              // Buscar el producto en el carrito
              let producto = productos.find((p) => p.product_id === parseInt(new_product_id))

              if (producto){
                // Si el producto existe
                producto.quantity += quantity;
                // Si la cantidad es menor a 0 entonces elimina ese producto
                if (producto.quantity < 0){
                  msg = "eliminado del"
                  let productos_restantes = productos.filter((p) => p.product_id !== parseInt(new_product_id))
                  cart.products = productos_restantes
                }
              }
              else {
                // El producto no existe lo agrega
                productos.push(
                    {
                      "product_id" : new_product_id,
                      "quantity" : quantity
                    }
                )
              }
              
          }       
          // Modifique los carritos entonces guardo
          this.carts_table.saveCarts(this.carts)
          return `Producto ${product.title} ${msg} carrito ${this.cart_id}`

      } catch(err) {
          return `Error al agregar el cart,  ${err}: `;
      }
  }

  getCarts(){
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((p)=>p.id === parseInt(id));
  }

  deleteProduct(cart_id, product_id, quantity){
    try {
      let carts_filtrados = this.carts.filter((p) => p.id !== parseInt(id));
      this.table.saveProducts(carts_filtrados);
      this.carts = carts_filtrados;
      return `cart ${id} eliminado`;
    }
    catch(err){
      return `Error al eliminar el cart ${id}, Error ${err}`;
    }
    
  }

}

module.exports = CartManager