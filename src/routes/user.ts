import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';
import signupValidate from '../middlewares/signupValidate';

const router = Router();
router.post('/register',signupValidate, UserController.createUser);
router.post('/login', UserController.login);
router.delete('/:id', authenticate, UserController.deleteUser);
router.get('/profile', authenticate, UserController.getUserProfile);
router.get('/:id', authenticate, UserController.getUser);
router.put('/change-password', authenticate, UserController.changePassword);
router.put('/:id', authenticate, UserController.updateUser);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password/:token', UserController.resetPassword);

export default router;
