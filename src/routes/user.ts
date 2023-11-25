import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);
router.get('/:id', authenticate, UserController.getUser);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/profile', authenticate, UserController.getUserProfile);
router.put('/change-password', authenticate, UserController.changePassword);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password/:token', UserController.resetPassword);

export default router;
