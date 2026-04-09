import nodemailer from "nodemailer";

let transporter;

const getTransporter = async () => {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  return transporter;
};

export const sendMail = async ({ to, subject, text }) => {
  const mailer = await getTransporter();

  if (!mailer) {
    console.warn(`Mail skipped for ${to}: SMTP not configured`);
    return { skipped: true };
  }

  await mailer.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text
  });

  return { skipped: false };
};
