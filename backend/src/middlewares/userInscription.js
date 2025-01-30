const Joi = require("joi");
const argon2 = require("argon2");

const userSchema = Joi.object({
  pseudo: Joi.string().min(4).max(30).alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  token: Joi.string().required(),
});

const inscription = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.details[0].message });
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while hashing the password." });
  }
};

module.exports = { inscription, hashPassword };
