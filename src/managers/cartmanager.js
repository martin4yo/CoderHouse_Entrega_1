const Cart = require('../models/cart');
const mongoose = require("mongoose");
const ProductManager = require('./productmanager.js');
const pm = new ProductManager;
const { ValidaIds } = require('./utils.js')

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

          ValidaIds({ cart_id : id });
    
          // Recupera el carrito
          const cart = await Cart.findById(id)
          
          if (!cart) {
            throw new Error(`El carrito ${id} no existe`)
          }

          return cart
    
        } catch (error) {
          console.log("No fue posible obtener el carrito", error)
          throw new Error(error.message);
        }
    
  }

  async deleteProductFromCart(cart_id, product_id) {

    try {

      ValidaIds({ cart_id, product_id });
      
      // Busca el carrito por el ID
      const cart = await this.getCartById(cart_id)

      // Busca el producto por el id
      const productId = new mongoose.Types.ObjectId(product_id);
      let product = cart.products.find(item => item.product.equals(productId));

      if (!product) {
        throw new Error(`El producto ${product_id} no se encontró en el carrito`)
      }

      //Filtro el producto del array
      let productos_restantes = cart.products.filter((p) => !p.product.equals(product_id));
      cart.products = productos_restantes;

      //Guardo el carrito sin ese producto
      // Modifique el carrito entonces guardo
      const updated_cart = Cart.findByIdAndUpdate(cart_id, cart, {new : true});
      return updated_cart;

    } catch (error) {
      throw new Error(error.message);
    }
  
  }


// Agrega un producto a un carrito existente
  // Si la cantidad no se recibe como parametro agrega 1
  async addProductsToCart(cart_id, products) {

    try {

      ValidaIds({ cart_id });

      // Busca el carrito por el ID
      const cart = await this.getCartById(cart_id)

      // Verifica que el array de productos tenga algo
      if (!products || products.length === 0){
        throw new Error('La lista de productos esta vacía');
      }

      // Limpia los articulos existentes 
      const new_products = [];

      for (const p of products) {
        
          ValidaIds({ product_id : p.product });

          // Busca el producto por el id
          const new_product = await pm.getProductById(p.product);

          // if (!new_product) {
          //   throw new Error(`El producto ${p.product} no existe`)
          // }

          // Agrega el producto al carrito
          let product = {};
          product.product = p.product;
          product.quantity = p.quantity;
          new_products.push(product);

        }
        
      cart.products = new_products;

      // Modifique el carrito entonces guardo
      const updated_cart = Cart.findByIdAndUpdate(cart_id, cart, {new : true});
      return updated_cart;

    } catch (error) {
      throw new Error(error.message);
    }

  }

  // Agrega un producto a un carrito existente
  // Si la cantidad no se recibe como parametro agrega 1
  async addProductToCart(cart_id, product_id, quantity, replace_quantity) {

    try {

      ValidaIds({ cart_id, product_id });
    
      // Busca el carrito por el ID
      const cart = await this.getCartById(cart_id)

      // Busca el producto por el id
      const new_product = pm.getProductById(product_id);
      if (!new_product) {
        throw new Error(`El producto ${product_id} no existe`)
      }

      // Busca en los productos del carrito el producto indicado
      const productId = new mongoose.Types.ObjectId(product_id);
      let product = cart.products.find(item => item.product.equals(productId));

      // Si no se pasa cantidad lo pone en 1
      if (!quantity && quantity !== 0) {
        quantity = 1;
      }

      if (product) {
            // El producto ya esta en el carrito
            if (replace_quantity){
              product.quantity = quantity
            } else  {
              product.quantity = product.quantity + quantity
            }
          }
      else {
        // El producto no esta en el carrito
        product = {};
        product.product = product_id;
        product.quantity = quantity;
        cart.products.push(product);
      }

      if (parseInt(product.quantity) <= 0 || quantity === 0) {
        //Si la cantidad queda menor o igual a 0 entonces elimina el producto del carrito
        let productos_restantes = cart.products.filter((p) => !p.product.equals(product_id));
        cart.products = productos_restantes;
      }

      // Modifique el carrito entonces guardo
      const updated_cart = Cart.findByIdAndUpdate(cart_id, cart, {new : true});
      return updated_cart;

    } catch (error) {
      console.log("Error", error.message)
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

        ValidaIds({ cart_id : id });
      
        // Recupera el carrito los productos
        const delete_cart = await this.getCartById(id);
        if (delete_cart) {
          // Elimina el carrito
          if (delete_cart.products.length === 0) {
            await Cart.findByIdAndDelete(id);
            return;
          }
          else {
            delete_cart.products = []
            const updated_cart = Cart.findByIdAndUpdate(id, delete_cart, {new : true});
            return updated_cart;
          }
        }
      }
    catch (error) {
      console.log("Error", error.message)
      throw new Error(error.message)
    }

  }

}

module.exports = CartManager