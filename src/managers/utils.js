const mongoose = require("mongoose");

function ValidaIds( { cart_id , product_id }){

    if (cart_id && !mongoose.Types.ObjectId.isValid(cart_id)){
      throw new Error(`El id de carrito ${cart_id} no es valido`);
      } 
  
    
    if (product_id && !mongoose.Types.ObjectId.isValid(product_id)) {
        throw new Error(`El id de producto ${product_id} no es valido`);
      }
   
  }

module.exports = { ValidaIds }