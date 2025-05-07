import mongoose, { Schema } from "mongoose";


const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    available: {
        type: Boolean,
        default: false,
    },

    // Obliga a que sea un id de Mongo
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

});

// Creamos el modelo basado en el schema
export const CategoryModel = mongoose.model('Category', categorySchema);

