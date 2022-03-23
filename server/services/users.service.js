const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersService = {
  existingUser: async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      rejectOnNotFound: false,
    });
    return user;
  },
}

module.exports = usersService;