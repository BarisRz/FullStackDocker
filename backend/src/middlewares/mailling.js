require("dotenv").config({ path: "../../.env" });
const { Resend } = require("resend");
const crypto = require("crypto");
const { userManager } = require("../managers");
const generateHtmlContent = require("./generateHtmlContent");

const resend = new Resend(process.env.RESEND_API_KEY);

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sendMail = async (req, res, next) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // à remplacer par ton domaine vérifié plus tard
      to: req.body.email,
      subject: `Vérifier votre adresse e-mail - Lorga`,
      html: generateHtmlContent(
        "emailConfirmation",
        req.body.pseudo,
        req.body.token,
      ),
    });
    console.log("Email sent to:", req.body.email);
    next();
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ Resend: error });
  }
};

const sendMailPasswordReset = async (req, res, next) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: req.body.email,
      subject: `Réinitialiser son mot de passe - Lorga`,
      html: generateHtmlContent("password", "none", req.body.token),
    });
    console.log("Email for password reset sent to:", req.body.email);
    next();
  } catch (error) {
    console.error("Resend error:", error);
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
