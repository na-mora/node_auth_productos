import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';
import config from '../config';
import Rol from '../models/Rol';

export const registro = async (request, response)=>{

    const datos = request.body;

    // Existe el usuario
    const existe = Usuario.findById({email: datos.email});

    const usuarioNuevo = new Usuario({
        nombre: datos.nombre,
        email: datos.email,
        contrasena: await Usuario.schema.methods.encriptarContrasena(datos.password)
    });

    if(datos.roles){
        const existeRol = await Rol.find({nombre: {$in: datos.roles}});
        usuarioNuevo.roles = existeRol.map(rol => rol._id);
    }
    else{
        // Bucamos el rol Usuario 
        const rol = await Rol.findOne({nombre: "Usuario"});

        // Lo colocamos por defecto
        usuarioNuevo.roles=[rol._id];
    }

    // Lo guardamos
    const usuarioGuardado = await usuarioNuevo.save();

    // Le damos un token para reutilizar la info
    const token = jwt.sign({id: usuarioGuardado._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    });

    response.json({ token });
}

export const login = async (request, response)=>{
    const email = request.body.email;

    // Encontrar el usuario
    const existeUsuario = await Usuario.findOne({email: email}).populate("roles");

    console.log(existeUsuario);
    if(existeUsuario){
        const password = existeUsuario.contrasena;
        const passwordRecibido = request.body.password;

        const coincidePassword = await Usuario.schema.methods.compararContrasena(password, passwordRecibido);
        if(coincidePassword){

            // Creamos el token
            const token = jwt.sign({id: existeUsuario._id}, config.SECRET, { expiresIn: 86400});
            return response.json({ token });
        }
        else{
            return response.json({
                status: "error",
                mensaje:"La conraseña no coincide"
            });
        }
        
    }
    else{
        return response.status(404).send({
            status: "error",
            mensaje: "Usuario no encontrado"
        });
    }
}