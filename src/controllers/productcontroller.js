const ProductManager = require("../managers/productmanager");
const pm = new ProductManager

const getProducts = async (req, res) => {
  try {
    //Instancia la clase ProductManager para recuperar la lista de productos completa

    const result = await pm.getProducts(req);
 
    if (result) {
      res.status(200).send({success : true, message : result});
    } else {
      res.status(400).send({success : false, message : "No se encontraron productos"});
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const getProductById = async (req, res) => {
  try {
    //Instancia la clase ProductManager para recuperar un producto por ID
    const { id } = req.params

    if (!id) {
      res.status(400).send({success : false, message : "ID de producto no proporcionado"}); 
      return;
    }

    const product = await pm.getProductById(id);
    if (product) {
      res.status(200).send({success : true, message : product});
    } else {
      res.status(400).send({success : false, message : `El id ${id} no corresponde a un producto existente`});
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params
    
    if (!id) {
      res.status(400).send({success : false, message : "ID de producto no proporcionado"}); 
      return;
    }

    const deleted_product = await pm.deleteProduct(id)

    if (!deleted_product) {
      res.status(400).send({success : false, message : `El id ${id} no corresponde a un producto existente`});
      return;
    }

    res.status(200).json({success : true, message : deleted_product});

  } catch (error) {
    res.status(500).send({success : false, message : error.message});
  }

};

const updateProduct = async (req, res) => {
  try {

    //Construye el json con los datos a actualizar desde el body
    const { id } = req.params;
    const data = req.body;
    try {

      //Llama al metodo de ProductManager para actualizar el producto
      const updated_product = await pm.updateProduct(id, data);

      if (!updated_product) {
        res.status(400).send({success : false, message : `El id ${id} no corresponde a un producto existente`});
        return;
      }

      res.status(200).send({success : true, message :updated_product});

    }
    catch (error) {
      res.status(400).send({success : false, message : error.message});
    }
  } catch (error) {
    res.status(500).send({success : false, message : "Error interno del servidor"});
  }
};

const addProduct = async (req, res) => {
  try {
    const data = req.body;

    // Si data es un array, iterar sobre cada producto
    if (Array.isArray(data)) {
      // Validar cada producto
      for (const product of data) {
        if (!isValidProduct(product)) {
          res.status(400).json({ success: false, message: "Uno o más productos tienen datos incompletos" });
          return;
        }
      }

      try {
        // Insertar todos los productos
        const newProducts = await Promise.all(data.map(pm.addProduct));
        res.status(200).json({ success: true, message: newProducts });
      } catch (error) {
        res.status(400).send({ success: false, message: error.message });
      }

    } else {
      // Validar el producto único
      if (!isValidProduct(data)) {
        res.status(400).json({ success: false, message: "Datos de producto incompletos" });
        return;
      }

      try {
        const newProduct = await pm.addProduct(data);
        res.status(200).json({ success: true, message: newProduct });
      } catch (error) {
        res.status(400).send({ success: false, message: error.message });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error interno del servidor" });
  }
};

// Función para validar los datos del producto
const isValidProduct = (product) => {
  return product.code !== undefined &&
         product.title !== undefined &&
         product.description !== undefined &&
         product.price !== undefined &&
         product.status !== undefined &&
         product.stock !== undefined &&
         product.category !== undefined &&
         product.thumbnails !== undefined;
};


module.exports = { getProducts, getProductById, updateProduct, addProduct, deleteProduct };
