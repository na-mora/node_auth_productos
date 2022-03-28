import {Schema, model} from 'mongoose';

const productoSchema = new Schema({
    nombre: String,
    categoria: String,
    precio: Number,
    imagenURL: String
},{
    timestamps: true,   // Fecha de creacion
    versionKey: false 
});

export default model('Producto', productoSchema);