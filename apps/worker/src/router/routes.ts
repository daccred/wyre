import controllers from './controllers';
import express from 'express';

const router = express.Router();

router.post('/send', controllers.createWorker);
router.get('/send/:id', controllers.show);

export default router;
