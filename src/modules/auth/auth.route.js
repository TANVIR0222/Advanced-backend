import { Router } from 'express';

import validate from '../../common/middleware/validation.middleware.js';
import * as Controller from './auth.controller.js';
import RegisterDto from './dto/register.dto';

const router = Router();

router.post('/register' , validate(RegisterDto) ,Controller.register)

export default router;
