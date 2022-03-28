import {Router} from 'express';
import * as controlador from '../controllers/auth.controller';
import { verificar } from '../middlewares';

const router = Router();

router.post('/registro', [verificar.existenRoles, verificar.emailDuplicado],controlador.registro);
router.post('/login', controlador.login);


export default router;