const Product = require('../models/product');
const mongoose = require("mongoose");
const { ValidaIds } = require('./utils.js')

class ProductManager {
  
  async addProduct(data) {

    try {

      //Agrega el producto 
      const product = new Product(data)
      return await product.save();

    } catch (error) {
      console.log("No fue posible crear el producto", error)
      throw new Error(error.message)
    }
  }

  async getProducts(req = { query: {} }) {
      try {

        // Recupero los parametros
        const { page = "1", limit = "10", field = "title", text = "", order = "1" } = req.query;
        
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const sortOrder = parseInt(order) || 1;

        // Filtro de texto "contiene"
        // const filter = { title: { $regex: ".*" + text + ".*", $options: 'i' } };
        // const filter = { [field]: { $regex: ".*" + text + ".*", $options: 'i' } };

        // Construir el filtro para buscar en varios campos
        const filter = {
            $or: [
                { code: { $regex: ".*" + text + ".*", $options: 'i' } },
                { title: { $regex: ".*" + text + ".*", $options: 'i' } },
                { description: { $regex: ".*" + text + ".*", $options: 'i' } },
                { category: { $regex: ".*" + text + ".*", $options: 'i' } }
            ]
        };
        
        // Armo el filtro y la paginacion
        const options = {
            page: pageNumber,
            limit: limitNumber,
            sort: { [field]: sortOrder }, 
        };

        // Ejecutar la consulta con paginación
        const result = await Product.paginate(filter, options);

        return {
          payload: result.docs,
          totalPages: result.totalPages,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          page : result.page,
          limit : limit,
          hasprevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevLink: result.hasPrevPage ? `page=${result.page - 1}&limit=${limitNumber}&field=${field}&text=${text}&order=${order}` : "",
          nextLink: result.hasNextPage ? `page=${result.page + 1}&limit=${limitNumber}&field=${field}&text=${text}&order=${order}` : "",
          field : field,
          text : text,
          sort : sortOrder
        };

      } catch (error) {
        console.log("No fue posible obtener la lista de productos", error)
        throw new Error(error.message);
      }
  }

  async getProductById(id) {
    //Busca un producto por ID
    try {

      ValidaIds({ product_id : id })

      // Recupera todos los productos
      const product = await Product.findById(id)
      return product

    } catch (error) {
      console.log("No fue posible obtener el producto", error)
      throw error;
    }

  }

  async updateProduct(id, data) {

    try {

      ValidaIds({ product_id : id })
  
      return await Product.findByIdAndUpdate(id, data, {new : true});

    } catch (error) {
      console.log("No fue posible actualizar el producto", error)
      throw new Error(error.message)
    }

  }

  async deleteProduct(id) {
    try {
      
      ValidaIds({ product_id : id })

      //Elimina el producto
      const deleted_product = await Product.findByIdAndDelete(id);
      return deleted_product;
      }

    catch (error) {
      console.log("No fue posible eliminar el producto", error)
      throw new Error(error.message)
    }

  }

}


module.exports = ProductManager;