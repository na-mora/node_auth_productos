import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    nombre: {type: String},
    email: {type: String, unique: true},
    contrasena: {type: String, unique: true},
    roles: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false,
    timestamps: true
});

//Metodos

usuarioSchema.methods.encriptarContrasena = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const nueva = await bcrypt.hash(password, salt);
    return nueva;
}
usuarioSchema.methods.compararContrasena = async (password, recibido)=>{

    // Primero va la contrasena verdadera y luego la recibida
    const esIgual = await bcrypt.compare(recibido, password);
    console.log(esIgual);
    return esIgual;
}

export default model('Usuario', usuarioSchema);