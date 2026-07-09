const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


async function sendPasswordResetEmail(email, token){

    const resetLink =
    `${process.env.FRONTEND_URL}/reset-password/${token}`;


    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `
            <h2>Password Reset</h2>

            <p>You requested a password reset.</p>

            <p>
                Click the link below:
            </p>

            <a href="${resetLink}">
                Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>
        `
    });
}


module.exports = {
    sendPasswordResetEmail
};