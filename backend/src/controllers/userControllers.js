const { userManager } = require("../managers");
const jwt = require("jsonwebtoken");

const add = async (req, res) => {
  const user = req.body;
  try {
    const insertedId = await userManager.create(user);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const emailConfirmation = async (req, res) => {
  const { token } = req.query;
  try {
    const result = await userManager.verifyEmail(token);
    if (result === 0) {
      res.status(404).json({ error: "Token not found or expired" });
    } else {
      res.status(201).json({ message: `Email confirmed for ${result}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordReseting = async (req, res) => {
  const user = req.body;
  try {
    const result = await userManager.verifyPasswordToken(user);
    if (result === 0) {
      res.status(404).json({ error: "Token not found or expired" });
    }
    res.status(201).json({ message: `Password reset for ${result}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const passwordResetRequest = async (req, res) => {
  const user = req.body;
  try {
    const insertedId = await userManager.forgottenPassword(user);
    res.status(201).json({ id: insertedId });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const userById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userManager.readId(id);
    if (user.length === 0) {
      return res.sendStatus(404);
    }
    delete user[0].password;
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = jwt.sign(user, process.env.ACCESS_APP_SECRET, {
      expiresIn: "15m", // DONT FORGERT TO CHANGE THIS TO 15MIN FOR PROD !!!
    });
    const refreshToken = jwt.sign(user, process.env.APP_SECRET, {
      expiresIn: "7d",
    });
    const insertId = await userManager.createRefreshToken(
      user.id,
      refreshToken
    );
    res.cookie("refreshTokenLorga", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user, accessToken, insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleRefreshToken = (req, res) => {
  const { refreshTokenLorga } = req.cookies;
  if (!refreshTokenLorga) {
    return res.status(401).send("No token");
  }
  try {
    jwt.verify(
      refreshTokenLorga,
      process.env.APP_SECRET,
      async (err, decoded) => {
        if (err) {
          res.clearCookie("refreshTokenLorga");
          return res.status(403).send("Invalid token");
        }
        const foundUser = await userManager.verifyRefreshToken(
          refreshTokenLorga,
          decoded.id
        );
        if (foundUser.length === 0) {
          res.clearCookie("refreshTokenLorga");
          return res.status(403).send("User not found");
        }
        if (!foundUser || foundUser[0].user_id !== decoded.id) {
          res.clearCookie("refreshTokenLorga");
          return res.status(403).send("Invalid token");
        }
        // Générer un nouveau accessToken
        delete decoded.exp;
        delete decoded.iat;
        const accessToken = jwt.sign(
          decoded,
          process.env.ACCESS_APP_SECRET,
          { expiresIn: "15m" } // Change to 15 minutes for production
        );
        res.json({ user: decoded, accessToken });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  // Dont forget TO ERASE the access token from the frontend
  const cookies = req.cookies.refreshTokenLorga;
  if (cookies) {
    await userManager.deleteRefreshToken(cookies);
    res.clearCookie("refreshTokenLorga");
    return res.sendStatus(200);
  }
  res.sendStatus(204);
};

const changePassword = async (req, res) => {
  const user = req.body;
  const { id } = req.user;
  try {
    const result = await userManager.updatePassword(user, id);
    res.status(201).json({ updated: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await userManager.deleteUser(id);
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.clearCookie("refreshTokenLorga");
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userAuthorized = async (req, res) => {
  return res.sendStatus(200);
};

module.exports = {
  add,
  emailConfirmation,
  userById,
  passwordResetRequest,
  passwordReseting,
  login,
  handleRefreshToken,
  logout,
  changePassword,
  deleteUser,
  userAuthorized,
};
