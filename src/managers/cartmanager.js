const Cart = require('../models/cart');
const mongoose = require("mongoose");
const ProductManager = require('./productmanager.js');
const pm = new ProductManager;

class CartManager {

  async addCart() {

    {
   
       try {
   
         //Agrega el carrito vacio 
         const cart = new Cart()
         return await cart.save();
   
       } catch (error) {
         console.log("No fue posible crear el carrito", error)
         throw new Error(error.message)
       }
     }
   

  }

  async getCartById(id) {
    // Devuelve un carrito segun el ID

        try {

          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`El id ${id} no es valido`);
          }
    
          // Recupera el carrito
          const cart = await Cart.findById(id)
          return cart
    
        } catch (error) {
          console.log("No fue posible obtener el carrito", error)
          throw new Error(error.message);
        }
    
  }

  // Agrega un producto a un carrito existente
  // Si la cantidad no se recibe como parametro agrega 1
  async addProductToCart(cart_id, product_id, quantity) {

    try {

      if (!mongoose.Types.ObjectId.isValid(cart_id)) {
              throw new Error(`El id ${cart_id} no es valido`);
      }

      // Busca el carrito por el ID
      console.log("Buscando carrito", cart_id)

      const cart = await this.getCartById(cart_id)

      if (!cart) {
        throw new Error(`El carrito ${cart_id} no existe`)
      }

      // Busca el producto por el id
      const new_product = pm.getProductById(product_id);

      if (!new_product) {
        throw new Error(`El producto ${product_id} no existe`)
      }

      const productId = new mongoose.Types.ObjectId(product_id);
      let product = cart.products.find(item => item.product.equals(productId));

      // Busca en los productos del carrito el producto indicado

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
        product.product = product_id;
        product.quantity = quantity;
        cart.products.push(product);
      }

      if (parseInt(product.quantity) <= 0) {
        //Si la cantidad queda menor o igual a 0 entonces elimina el producto del carrito
        let productos_restantes = cart.products.filter((p) => p.product !== product_id);
        cart.products = productos_restantes;
      }

      // Modifique el carrito entonces guardo
      const updated_cart = Cart.findByIdAndUpdate(cart_id, cart, {new : true});
      return updated_cart;

    } catch (error) {
      throw new Error(error.message);
    }

  }

  async getCarts() {
    // Devuelve la coleccion de carritos completa
     try {
    
        // Recupera todos los productos
        const carts = await Cart.find()
        return carts;

      } catch (error) {
        console.log("No fue posible obtener la lista de carritos", error)
        throw new Error(error.message);
      }
  }


  async deleteCart(id) {
    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido`);
        }

      // Recupera el carrito los productos
      const delete_cart = await Cart.findById(id);

      if (delete_cart) {
        // Elimina el carrito
        console.log("Productos", delete_cart.products);
        if (!delete_cart.product) {
          await Cart.findByIdAndDelete(id);
          return delete_cart;
        }
        else {
          throw new Error("El carrito no esta vacio");
        }
      }
      else
        {
          throw new Error("El carrito no existe");
        }
      }
    catch (error) {
      throw new Error(error.message)
    }

  }

}

module.exports = CartManager