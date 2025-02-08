const { Products } = require('../db/products.js');

class ProductManager {
     constructor() {
        this.table = new Products;
        this.productos = this.table.getProducts();
        this.producto_id = this.productos.length;

        const max_id = Math.max(...productos.map(p => p.id));
        if (max_id){
          this.producto_id = max_id;
        }        
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

        this.producto_id++
        const new_product = {
            "id" : this.producto_id,
            ...product
        }

        this.productos.push(new_product);
        this.table.saveProducts(this.productos)
        return new_product

    } catch(err) {
        return `Error al agregar el producto,  ${err}: `;
    }
  }

  getProducts(){
    return this.productos;
  }

  getProductById(id) {
    return this.productos.find((p)=>p.id === parseInt(id));
  }

  updateProduct(product){

    if ("id" in product){
      const actual_product = this.getProductById(product.id)
      if (actual_product){
        const index = this.productos.findIndex(p => p.id === product.id);
        Object.keys(product).forEach(key => {
          if (product.hasOwnProperty(key)) {
              this.productos[index][key] = product[key];
          }
        });
        this.table.saveProducts(this.productos)
        return this.productos[index]
      }
      else {
        throw new Error(`No se encontro el producto con el id ${product.id}`);
      }
    }
    else
      {
        throw new Error("No se encontro el campo id para recuperar el producto");
      }
  }

  deleteProduct(id){
    try {
      let product = this.productos.filter((p) => p.id === parseInt(id));
      console.log(product);
      if (product.length !==0) {
        let productos_filtrados = this.productos.filter((p) => p.id !== parseInt(id));
        this.table.saveProducts(productos_filtrados);
        this.productos = productos_filtrados;
        return `Producto ${id} eliminado`;
      }
      else {
        return `El producto ${id}, no existe`;
      }
    }
    catch(err){
      return `Error al eliminar el producto ${id}, Error ${err}`;
    }
    
  }

}


module.exports = ProductManager