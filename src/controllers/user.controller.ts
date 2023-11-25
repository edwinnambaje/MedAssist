import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import User, { IUser } from "../models/User";
import { successResponse } from "../utils";
import { BadRequestError, NotFoundError } from "../errors/index";
import { Jwt } from "../middlewares/jwt";
import generateNumberToken from "../utils/generateToken";
import sendEmail from "../utils/sendEmail";
import SignUpValidation from "../utils/joi";

interface ExtendedRequest extends Request {
    user: IUser;
}

class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                username, email, password
            } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('Email Already exists')
            }
            const newUser = new User({
                username, email, password
            });
            await newUser.save();
            return res.send(successResponse("User created successfully", newUser));
        } catch (error) {
            next(error)
        }
    }
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email, password
            } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new NotFoundError('User not found');
            }
            const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new BadRequestError('Incorrect Credentials')
            }
            const token = Jwt.generateToken({
                _id: user._id,
                username: user.username,
                email: user.email
            });
            return res.send(successResponse("Login successfully", token));
        } catch (error) {
            next(error);
        }
    }
    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                throw new NotFoundError('User not found');
            }
            return res.send(successResponse("User fetched successfully", user));
        } catch (error) {
            next(error);
        }
    }
    static async getUserProfile(req: ExtendedRequest, res: Response, next: NextFunction) {
        try {
            const { _id } = req.user;
            const user = await User.findById(_id);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            return res.send(successResponse(null, user));
        } catch (error) {
            next(error);
        }
    }
    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const {
                username, email
            } = req.body;
            const user = await User.findById(userId);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            const updatedUser = await User.findByIdAndUpdate(userId, {
                username, email
            }, { new: true });
            return res.send(successResponse("User updated successfully", updatedUser));
        } catch (error) {
            next(error);
        }
    }
    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            await User.findByIdAndDelete(userId);
            return res.send(successResponse("User deleted successfully", null));
        } catch (error) {
            next(error);
        }
    }
    static async changePassword(req: ExtendedRequest, res: Response, next: NextFunction) {
        try {
            const { oldPassword, newPassword } = req.body
            const { user } = req
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
            if (!isPasswordValid) {
                throw new BadRequestError('Incorrect Old Password')
            }
            user.password = newPassword;
            await user.save()
            return res.send(successResponse("Password updated successfully", user));
        } catch (err) {
            next(err);
        }
    }
    static async forgotPassword(req: ExtendedRequest, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new NotFoundError('User not found')
            }
            const token = generateNumberToken(6);
            await sendEmail(email, 'Password Reset', `Your reset token is: ${token}`);
            user.resetToken = token;
            await user.save();
            return res.send(successResponse("password reset link sent to your email account", null));
        } catch (err) {
            next(err);
        }
    }
    static async resetPassword(req: ExtendedRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            const user = await User.findOne({ resetToken: token });
            if (!user) {
                throw new NotFoundError('User not found')
            }
            user.password = newPassword;
            await user.save();
            return res.send(successResponse("Password reset successfully", null));
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
