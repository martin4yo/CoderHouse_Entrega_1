const { Products } = require('../db/products.js');

class ProductManager {
  constructor() {

    //Instancia la clase Products que administra la tabla 
    this.table = new Products;

    //Recupera los productos guardados
    this.productos = this.table.getProducts();

    //Setea el ID a la cantidad de items del objeto
    this.producto_id = this.productos.length;

    //Resetea el ID al ultimo ID utilizado por si se eliminaron objetos intermedios
    if (this.productos.length > 0){
      const max_id = Math.max(...this.productos.map(p => p.id));
      if (max_id) {
        this.producto_id = max_id;
      }
    } 

    
  }

  // Agrega un producto, 
  // si el producto tiene el mismo codigo o descripcion que uno existente da un error
  // si falta algun dato da un error
  //    title, descripcion, code, price, status, stock, category, thumbnails

  addProduct(product) {

    try {

      // Verifica si existe el producto filtrando por titulo, codigo y descripcion
      const existe = this.productos.find((p) => p.title === product.title || p.code === product.code || p.descripcion === product.descripcion);
    
      if (product.code === undefined || product.title === undefined || product.description === undefined) {
        throw new Error("Los datos title, code y description son obligatorios !!")
      }  

      if (existe) {
        // Si existe no lo agrega
        throw new Error("Producto existente, no sera agregado !!")
      }

      //Incrementa el ID del producto
      this.producto_id++

      //Crea la estructura del nuevo producto utilizando la estructura que recibio como parametro, le agrega el ID
      const new_product = {
        "id": this.producto_id,
        ...product
      }

      //Agrega el producto al array de productos
      this.productos.push(new_product);

      //Guarda el array en el archivo
      this.table.saveProducts(this.productos)
      return new_product

    } catch (err) {
      throw new Error(`${err} `)
    }
  }

  getProducts() {
    //Devuelve el array de todos los productos
    return this.productos;
  }

  getProductById(id) {
    //Busca un producto por ID
    return this.productos.find((p) => p.id === parseInt(id));
  }

  updateProduct(product) {
    // Verifica que el campo ID este en la estructura pasada como parametro
    if ("id" in product) {

      //Recupera el producto segun el ID
      const actual_product = this.getProductById(product.id)

      //Si el producto existe
      if (actual_product) {

        //Busca el indice que tiene ese producto en el array
        const index = this.productos.findIndex(p => p.id === product.id);

        //Recorre todas las propiedades del objeto que indica el index y las reemplaza
        //por las que se recibieron en el objeto parametro
        Object.keys(product).forEach(key => {
          if (product.hasOwnProperty(key)) {
            this.productos[index][key] = product[key];
          }
        });

        //Guarda la tabla de productos
        this.table.saveProducts(this.productos)
        return this.productos[index]
      }
      else {
        throw new Error(`No se encontro el producto con el id ${product.id}`);
      }
    }
    else {
      throw new Error("No se encontro el campo id para recuperar el producto");
    }
  }

  deleteProduct(id) {
    try {
      //Busca el producto por el ID
      let product = this.productos.filter((p) => p.id === parseInt(id));
      
      if (product.length > 0) {

        //Si encontro el producto arma un array con todos los productos menos el indicado en el id
        let productos_filtrados = this.productos.filter((p) => p.id !== parseInt(id));

        //Guarda la tabla
        this.table.saveProducts(productos_filtrados);

        //Reemplaza el array de productos por el nuevo array sin el elemento eliminado
        this.productos = productos_filtrados;
        return `Producto ${id} eliminado`;
      }
      else {
        throw new Error(`El producto ${id}, no existe`)
      }
    }
    catch (err) {
      throw new Error(err)
    }

  }

}


module.exports = ProductManager;