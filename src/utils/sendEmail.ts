import { NextFunction } from "express";
import nodemailer, { Transporter } from "nodemailer";

const sendEmail = async (email: string, subject: string, text: string, next?:NextFunction): Promise<void> => {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            service: process.env.SERVICE as string,
            auth: {
                user: process.env.USER as string,
                pass: process.env.PASS as string,
            },
        });
        await transporter.sendMail({
            from: process.env.USER as string,
            to: email,
            subject: subject,
            html: text,
        });
        console.log("email sent successfully");
    } catch (error) {
       next(error);
    }
};

export default sendEmail;
