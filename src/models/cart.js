const mongoose = require("mongoose");

//* Definimos el Schema
const cartSchema = new mongoose.Schema({
  products: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, required: true, default: 1}
  }],
});

cartSchema.pre('find', function() {
    this.populate('products.product'); // Realiza el populate automáticamente en el campo `courses.course`
});
cartSchema.pre('findOne', function() { //* findById es solo un atajo de findOne
    this.populate('products.product'); // Realiza el populate automáticamente en el campo `courses.course`
});
cartSchema.pre('findById', function() { 
    this.populate('products.product'); 
});

module.exports = mongoose.model("Cart", cartSchema)
