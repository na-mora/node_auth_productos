import {Schema, model} from 'mongoose';

export const Roles = ["Admin", "Moderador", "Usuario"];

const rolSchema = new Schema({
    nombre: String
},{
    versionKey: false
});
export default model('Rol', rolSchema);