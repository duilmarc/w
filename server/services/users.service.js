const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const usersService = {
  existingUser: async (email) => {
    try{
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        rejectOnNotFound: false,
      });
      return user;
    }
    catch(err){
      console.log(err);
      throw err;
    }
  },
}

module.exports = usersService;