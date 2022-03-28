import Producto from '../models/Producto';

// Funciones que se ejecutan depues de un get o post
export const crearProducto = async (request, response)=>{

    // Creamos un nuevo producto con la informacion del json
    const nuevoProducto = new Producto({
        nombre: request.body.nombre,
        categoria: request.body.categoria,
        precio: request.body.precio,
        imagenURL: request.body.imagenURL
    });

    // Lo guardamos en bbdd
    const productoGuardado =await nuevoProducto.save();

    console.log(productoGuardado);
    response.status(201).json(productoGuardado);
};

export const obtenerProductos = async (request, response)=>{

    // Hacemos la consulta a la base de datos
    const listaProductos = await Producto.find();
    // Retornamos la lista de productos cono json
    response.json(listaProductos);
};

export const obtenerProductoPorId = async(request, response)=>{
    const id = request.params.productoId;

    try{
        const encontrado = await Producto.findById(id);
        if(encontrado){
            response.status(200).json(encontrado);
        }
        else{
            response.status(404).json("No encontrado");
        }
    }
    catch(error){
        response.status(404).json("No encontrado");
        console.log(error);
    }

   
};

export const actualizarProductoPorId = async (request, response)=>{

    const id = request.params.productoId;
    const body = request.body;
    const configuracion = {new: true};

    const actualizado = await Producto.findByIdAndUpdate(id, body, configuracion);
    response.status(200).json(actualizado);
};

export const eliminarProductoPorId = async (request, response)=>{
    const id = request.params.productoId;
    const eliminado = await Producto.findByIdAndRemove(id);

    response.status(200).json(eliminado);
};