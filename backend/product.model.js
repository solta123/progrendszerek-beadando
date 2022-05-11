const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    price: { type: Number },
    description: { type: String },
    releaseDate: { type: Date },
    image: { type: String },
    developer: { type: String },
    publisher: { type: String }
}, { collection: 'products' });

mongoose.model('product', productSchema);