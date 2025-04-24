import mongoose from "mongoose";


// schema: reglas de como queremos grabar la informacion

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    img: {
        type: String,
    },
    role: {
        type: [ String ],
        default: [ 'USER_ROLE' ],
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ],
    },
    
});

// Creamos el modelo basado en el schema
export const UserModel = mongoose.model('User', userSchema);

