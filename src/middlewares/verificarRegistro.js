import {ROLES} from '../models/Rol';
import Usuario from '../models/Usuario';

export const existenRoles = (request, response, next)=>{
    const roles = request.body.roles;
    if(roles){
        for(let i =0; i<roles.lenght; i++){
            if(!ROLES.includes(roles[i])){
                return response.status(400).json({
                    status: "error",
                    mensaje: "Rol incorrecto"
                })
            }
        }
    }
    next();
    return;
}

export const emailDuplicado = async (request, response, next)=>{
    const email = request.body.email;

    const buscarUsuario = await Usuario.findOne({email: email});

    if(buscarUsuario){
        return response.status(400).json({
            status: "error",
            mensaje: "Este email ya se encuentra registrado"
        });
    }
    else{
        next();
        return ;
    }
}