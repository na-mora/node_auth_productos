import {Router} from 'express';
import * as productosControlador from '../controllers/productos.controller';
import {auth} from '../middlewares';

const router = Router();

// Llamada a el controlador

// Crear un nuevo producto
router.post('/', [auth.verificarToken, auth.esAdmin], productosControlador.crearProducto);

// Obtener productos
router.get('/',productosControlador.obtenerProductos);

// Obtener un producto
router.get('/:productoId',productosControlador.obtenerProductoPorId);

// Actualizar un producto
router.put('/:productoId', [auth.verificarToken, auth.esAdmin], productosControlador.actualizarProductoPorId);

// Eliminar un producto
router.delete('/:productoId', [auth.verificarToken, auth.esAdmin], productosControlador.eliminarProductoPorId);

export default router;
