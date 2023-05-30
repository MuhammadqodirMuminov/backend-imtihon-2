import { Router } from 'express';

import userContoller from '../controllers/user.contoller.js';
import validate from '../middlewares/validate.js';

const router = Router();

router.get('/', userContoller.GET);

router.get('/events', userContoller.GET_PAGE);

router.post('/add-event', validate, userContoller.POST_EVENT);

export default router;
