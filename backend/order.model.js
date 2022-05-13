const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    username: { type: String, required: true, lowercase: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true }
}, { collection: 'orders' });

mongoose.model('order', orderSchema);