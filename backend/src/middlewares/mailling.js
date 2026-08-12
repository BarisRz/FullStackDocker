require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { userManager } = require("../managers");
const generateHtmlContent = require("./generateHtmlContent");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sendMail = async (req, res, next) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: `Vérifier votre adresse e-mail - Lorga`,
    html: generateHtmlContent(
      "emailConfirmation",
      req.body.pseudo,
      req.body.token,
    ),
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", req.body.email);
    next();
  } catch (error) {
    console.error("Nodemailer error:", error);
    res.status(500).json({ Nodemailer: error });
  }
};

const sendMailPasswordReset = async (req, res, next) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: req.body.email,
    subject: `Réinitialiser son mot de passe - Lorga`,
    html: generateHtmlContent("password", "none", req.body.token),
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email for password reset sent to:", req.body.email);
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while sending the email." });
  }
};

const emailConfirmation = async (req, res, next) => {
  try {
    await userManager.emailConfirmation(req.body);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const tokenGeneration = async (req, res, next) => {
  const token = generateToken();
  req.body.token = token;
  next();
};

module.exports = {
  sendMail,
  emailConfirmation,
  tokenGeneration,
  sendMailPasswordReset,
};
