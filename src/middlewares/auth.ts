import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticationError, NotFoundError } from "../errors";

interface ExtendedRequest extends Request {
    user: IUser;
}

const authenticate = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            throw new AuthenticationError("Missing Authorization Token");
        }
        const token = authorization.split(' ')[1]
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if (!decoded) {
            throw new AuthenticationError("Unauthorized Error");
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
       next(error)
    }
}

export { authenticate };