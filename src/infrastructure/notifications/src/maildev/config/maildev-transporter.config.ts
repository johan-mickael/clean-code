import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';

// Define the transporter configuration type
interface TransporterConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
}

const transporterConfig: TransporterConfig = {
  host: process.env.MAIL_HOST!,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  tls: {
    rejectUnauthorized: process.env.MAIL_REJECT_UNAUTHORIZED === 'true',
  },
};

const maildevTransporter: Transporter = nodemailer.createTransport(transporterConfig);

export { maildevTransporter };
