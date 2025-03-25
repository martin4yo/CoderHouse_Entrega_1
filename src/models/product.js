const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  status: {
    type: Boolean,
    required: true,
    index: true
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  thumbnails: {
    type: String,
    required: false,
  },
});

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Product", productSchema)

