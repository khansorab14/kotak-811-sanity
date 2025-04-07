import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anikets2048@gmail.com",
    pass: "dpxjmkjgggbpunkx",
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: `"Kotak811 Admin" <${"khansorab14@gmail.com"}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
