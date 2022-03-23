const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { PrismaClient, Role } = require("@prisma/client");
const usersService = require("../services/users.service");
const prisma = new PrismaClient();

const usersController = {
  // signup
  signup: async (req, res) => {
    const adminEmails = process.env.ADMIN_EMAILS.split(" ");
    const role = adminEmails.includes(req.body.email) ? Role.ADMIN : Role.USER;
    const { password, email, name } = req.body;
    const existsUser = await usersService.existingUser(email);
    if (existsUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }
    const cryptedPassword = bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
      data: {
        password: cryptedPassword,
        email,
        name,
        role,
      },
    });

    const token = jwt.sign(
      { uuid: user.uuid },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  },
  // login
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await usersService.existingUser(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const token = jwt.sign(
      { uuid: user.uuid },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  },
  socialLogin: async (req, res) => {
    const { email, name } = req.body;
    const adminEmails = process.env.ADMIN_EMAILS.split(" ");
    const role = adminEmails.includes(email) ? Role.ADMIN : Role.USER;
    let user = await usersService.existingUser(email);
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: role,
        },
      });
    }
    const token = jwt.sign(
      { uuid: user.uuid },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ token });
  }
};

module.exports = usersController;
