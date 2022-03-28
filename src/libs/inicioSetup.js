import Rol from '../models/Rol'


export const crearRoles = async()=>{

    try{
        const numeroDocumentos = await Rol.estimatedDocumentCount();
        if(numeroDocumentos>0){
            return ;
        }
        else{
            const valores = await Promise.all([
                new Rol({nombre: "Usuario"}).save(),
                new Rol({nombre: "Admin"}).save(),
                new Rol({nombre: "Moderador"}).save()
            ])
            console.log(valores);
        }
    }
    catch(error){
        console.log(error);
    }
    
}