import express from 'express';
import morgan from 'morgan';

import pkg from '../package.json';

import rutaProductos from './routes/productos.routes';
import rutaAutenticacion from './routes/autenticacion.routes';
import rutaUsuarios from './routes/usuarios.routes';

import {crearRoles} from './libs/inicioSetup';

const app = express();

// Creamos los roles
crearRoles();

// Entender los JSON
app.use(express.json());

// Morgan para recibir los datos en consola
app.use(morgan('dev'));

// Guardamos el pkg en express
app.set('pkg', pkg);


// Rutas
app.get('/', (request, response)=>{
   response.json({
       nombre: app.get('pkg').name,
       autor: app.get('pkg').author,
       descripcion: app.get('pkg').description,
       version: app.get('pkg').version,
       notas: "Pagina de inicio de Api Rest"
   }); 
});

// Rutas para los productos
app.use('/api/productos', rutaProductos);
app.use('/api/auth', rutaAutenticacion);
app.use('/api/usuarios', rutaUsuarios);
export default app;