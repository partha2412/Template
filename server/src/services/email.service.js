import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
    },
});

export const sendPasswordResetEmail = async (
    email,
    resetUrl
) => {
    await transporter.sendMail({
        from: `"Smart Gallery System" <${env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your password",

        html: `
            <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                        <title>Password Reset</title>
                    </head>

                    <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
">

                        <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
        background-color: #f4f7fb;
        min-height: 100vh;
    "
                        >
                            <tr>
                                <td
                                    align="center"
                                    valign="middle"
                                    style="padding: 40px 20px;"
                                >

                                    <!-- Main Card -->
                                    <table
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                        style="
                    max-width: 600px;
                    background-color: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
                "
                                    >

                                        <!-- Header -->
                                        <tr>
                                            <td
                                                align="center"
                                                style="
                            padding: 40px 30px 30px;
                            background-color: #111827;
                        "
                                            >

                                                <div style="
                            width: 64px;
                            height: 64px;
                            line-height: 64px;
                            border-radius: 50%;
                            background-color: #ffffff;
                            color: #111827;
                            font-size: 28px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        ">
                                                    S
                                                </div>

                                                <h1 style="
                            margin: 0;
                            color: #ffffff;
                            font-size: 28px;
                            font-weight: 700;
                        ">
                                                    Smart Gallery
                                                </h1>

                                                <p style="
                            margin: 10px 0 0;
                            color: #d1d5db;
                            font-size: 14px;
                        ">
                                                    Account Security
                                                </p>

                                            </td>
                                        </tr>


                                        <!-- Content -->
                                        <tr>
                                            <td
                                                style="
                            padding: 45px 40px;
                            color: #111827;
                        "
                                            >

                                                <h2 style="
                            margin: 0 0 18px;
                            font-size: 24px;
                            color: #111827;
                        ">
                                                    Reset your password
                                                </h2>

                                                <p style="
                            margin: 0 0 18px;
                            font-size: 16px;
                            line-height: 1.7;
                            color: #4b5563;
                        ">
                                                    We received a request to reset the password
                                                    for your Smart Gallery account.
                                                </p>

                                                <p style="
                            margin: 0 0 30px;
                            font-size: 16px;
                            line-height: 1.7;
                            color: #4b5563;
                        ">
                                                    Click the button below to create a new password.
                                                </p>


                                                <!-- Button -->
                                                <table
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    border="0"
                                                    width="100%"
                                                >
                                                    <tr>
                                                        <td align="center">

                                                            <a
                                                                href="${resetUrl}"
                                                                style="
                                            display: inline-block;
                                            width: 80%;
                                            max-width: 300px;
                                            padding: 15px 25px;
                                            background-color: #111827;
                                            color: #ffffff;
                                            text-decoration: none;
                                            font-size: 16px;
                                            font-weight: 600;
                                            border-radius: 8px;
                                            text-align: center;
                                        "
                                                            >
                                                                Reset Password
                                                            </a>

                                                        </td>
                                                    </tr>
                                                </table>


                                                <!-- Expiration Warning -->
                                                <table
                                                    width="100%"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    border="0"
                                                    style="
                                margin-top: 35px;
                                background-color: #fef3c7;
                                border-radius: 8px;
                            "
                                                >
                                                    <tr>
                                                        <td
                                                            style="
                                        padding: 15px;
                                        color: #92400e;
                                        font-size: 14px;
                                        line-height: 1.6;
                                    "
                                                        >
                                                            <strong>Important:</strong>
                                                            This password reset link will expire
                                                            in 15 minutes.
                                                        </td>
                                                    </tr>
                                                </table>


                                                <p style="
                            margin: 30px 0 0;
                            font-size: 14px;
                            line-height: 1.6;
                            color: #6b7280;
                        ">
                                                    If you didn't request a password reset,
                                                    you can safely ignore this email. Your
                                                    password will remain unchanged.
                                                </p>

                                            </td>
                                        </tr>


                                        <!-- Footer -->
                                        <tr>
                                            <td
                                                align="center"
                                                style="
                            padding: 25px 30px;
                            background-color: #f9fafb;
                            border-top: 1px solid #e5e7eb;
                        "
                                            >

                                                <p style="
                            margin: 0;
                            font-size: 13px;
                            color: #9ca3af;
                        ">
                                                    © ${new Date().getFullYear()}
                                                    Smart Gallery System
                                                </p>

                                                <p style="
                            margin: 8px 0 0;
                            font-size: 12px;
                            color: #9ca3af;
                        ">
                                                    This is an automated security email.
                                                    Please do not reply.
                                                </p>

                                            </td>
                                        </tr>

                                    </table>

                                </td>
                            </tr>
                        </table>

                    </body>
                </html>
                `,
    });
};