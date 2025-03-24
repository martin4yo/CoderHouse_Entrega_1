const Product = require('../models/product');
const mongoose = require("mongoose");

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

  async getProducts(req) {
      try {

        const { page = 1, limit = 10 } = req.query; 

        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: { grade: -1 },
        };
    
        const result = await Product.paginate({}, options);

        return {
          payload: result.docs,
          totalPages: result.totalPages,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
          page : result.page,
          limit : limit,
          prevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevLink: result.hasPrevPage ? `page=${result.page - 1}&limit=${limit}` : "",
          nextLink: result.hasNextPage ? `page=${result.page + 1}&limit=${limit}` : ""
        };

      } catch (error) {
        console.log("No fue posible obtener la lista de productos", error)
        throw new Error(error.message);
      }
  }

  async getProductById(id) {
    //Busca un producto por ID
    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido`);
      }

      // Recupera todos los productos
      const product = await Product.findById(id)
      return product

    } catch (error) {
      console.log("No fue posible obtener el producto", err)
      throw new Error(error.message);
    }

  }

  async updateProduct(id, data) {

    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido`);
      }
  
      return await Product.findByIdAndUpdate(id, data, {new : true});

    } catch (error) {
      console.log("No fue posible actualizar el producto", error)
      throw new Error(error.message)
    }

  }

  async deleteProduct(id) {
    try {
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`El id ${id} no es valido`);
      }

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