import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true,
    },

    available: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
    },

    // Obliga a que sea un id de Mongo
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

});

// Creamos el modelo basado en el schema
export const ProductModel = mongoose.model('Category', productSchema);

