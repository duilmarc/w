const { Role, PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const middleware = {
  tokenMiddleware: async (req, res, next) => {
    const bearer = req.headers.authorization;
    const token = bearer?.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET || "secret", async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
            error: err,
          });
        }
        const user = await prisma.user.findUnique({
          where: {
            uuid: decoded.uuid,
          },
        });
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        message: "No token provided",
      });
    }
  },
  adminMiddleware: async (req, res, next) => {
    // const user = await prisma.user.findUnique({
    //   where: {
    //     uuid: req.user.uuid,
    //   },
    //   rejectOnNotFound: false,
    // });
    if (req.user.role !== Role.ADMIN) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
    next();
  },
};

module.exports = middleware;
