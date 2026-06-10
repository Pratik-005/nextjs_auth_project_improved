import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'

export async function mailer({ email, emailType, userId }: any) {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType == 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            }, { new: true });
        }

        if (emailType == 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            }, { new: true });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "63f9eeaf0437a0",
                pass: "ea2492f334fa7d"
            }
        });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.BASE_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.BASE_URL}/verifyemail?token=${hashedToken}
            </p>`
        }

        await transport.sendMail(mailOptions);

    } catch (error: any) {
        throw new Error(error.message);
    }
}