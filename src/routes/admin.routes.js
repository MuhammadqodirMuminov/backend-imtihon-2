import { Router } from 'express';

import adminController from '../controllers/admin.controller.js';
import checkToken from '../middlewares/check-token.js';
import validate from '../middlewares/validate.js';

const router = Router();

router.post('/login', validate, adminController.POST_LOGIN);

router.get('/pending', checkToken, adminController.GET_PENDING);

router.put('/pending/:id', checkToken, adminController.POST_PENDING);

router.get('/accepted', checkToken, adminController.GET_ACCEPTED);

export default router;
