import jwt from "jsonwebtoken";
import config from '../config'; 
import Usuario from "../models/Usuario";
import Rol from '../models/Rol';

export const verificarToken = async(request, response, next)=>{
    const token = request.headers["x-access-token"];

    if(!token){
        return response.status(403).json({
            status: "error",
            mensaje: "No han dado token"
        });
    }
    else{
        const decodificado = jwt.verify(token, config.SECRET);
        request.idUsuario = decodificado.id;

        // Buscamos el usuario
        const buscarUsuario = await Usuario.findById(request.idUsuario, {password: 0});
        if(!buscarUsuario){
            return response.status(400).json({
                status: "error",
                mensaje: "No existe el usuario"
            });
        }
        else{
            console.log(token);
            next();
        }
    }
    
    
}

export const esModerador = async (request, response, next)=>{
    const idUsuario = request.idUsuario;

    const busqueda = await Usuario.findById(idUsuario);
    
    const roles = await Rol.find({_id: {$in: busqueda.roles}});
    console.log(roles);
    for(let i =0; i< roles.length; i++){
        
        if(roles[i].nombre == "Moderador"){
            next();
            return ;
        }
    }
    return response.status(403).json({
        status: "error",
        mensaje: "No eres Moderador"
    });
    
}

export const esAdmin = async (request, response, next)=>{
    const idUsuario = request.idUsuario;

    const busqueda = await Usuario.findById(idUsuario);
    
    const roles = await Rol.find({_id: {$in: busqueda.roles}});
    console.log(roles);
    for(let i =0; i< roles.length; i++){
        
        if(roles[i].nombre == "Admin"){
            next();
            return ;
        }
    }
    return response.status(403).json({
        status: "error",
        mensaje: "No eres Admin"
    });
}
