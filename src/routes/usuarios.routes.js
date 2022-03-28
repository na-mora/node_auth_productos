import {Router} from 'express';
import * as controlador from '../controllers/usuarios.controller';
import {auth, verificar} from '../middlewares';
const router = Router();

router.post('/', [auth.verificarToken, verificar.existenRoles ,auth.esAdmin ],controlador.crearUsuario);

export default router;