const { Products } = require('../db/products.js');

class ProductManager {
     constructor() {
        this.table = new Products
        this.productos = this.table.getProducts()
        this.producto_id = this.productos.length;
     }      

    // Agrega un producto, 
    // si el producto tiene el mismo codigo o descripcion que uno existente da un error
    // si falta algun dato da un error
    //    title, descripcion, code, price, status, stock, category, thumbnails

    addProduct(product){

      try {

          const existe = this.productos.find((p)=>p.title === product.title || p.code === product.code || p.descripcion === product.descripcion);
          
          if(existe){
              return "Producto existente, no sera agregado !!";
          }

          console.log(product)
          console.log(this.productos)

          this.producto_id++
          const new_product = {
              "id" : this.producto_id,
              ...product
          }
  
          this.productos.push(new_product);
          this.table.saveProducts(this.productos)

      } catch(err) {
          return `Error al agregar el producto,  ${err}: `;
      }
  }

  getProducts(){
    return this.productos;
  }

  getProductById(id) {
    return this.productos.find((p)=>p.id = id);
  }

  deleteProduct(id){
    try {
      let productos_filtrados = this.productos.filter((p) => p.id !== id);
      this.table.saveProducts(productos_filtrados);
      this.productos = productos_filtrados;
      return `Producto ${id} eliminado`;
    }
    catch(err){
      return `Error al eliminar el producto ${id}, Error ${err}`;
    }
    
  }

}


module.exports = ProductManager