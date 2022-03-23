const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const giftsController = {
  getAll: async (req, res) => {
    const gifts = await prisma.gift.findMany();
    return res.status(200).json(gifts);
  },
  addGift: async (req, res) => {
    const { name, description, url, image } = req.body;
    const gift = await prisma.gift.create({
      data: {
        name,
        description,
        url,
        image,
      },
    });
    return res.status(200).json(gift);
  },
  addToUser: async (req, res) => {
    const { userUuid, giftUuid } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
      rejectOnNotFound: false,
    });
    const gift = await prisma.gift.findUnique({
      where: {
        uuid: giftUuid,
      },
      rejectOnNotFound: false,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        gifts: {
          connect: {
            id: gift.id,
          },
        },
      },
    });
    return res.status(200).json(gift);
  },
  getOne: async (req, res) => {
    const { uuid } = req.params;
    try {
      const gift = await prisma.gift.findUnique({
        where: {
          uuid,
        },
        rejectOnNotFound: false,
      });
      return res.status(200).json(gift);
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: "Gift not found" });
    }
  },
  editGift: async (req, res) => {
    const { name, description, url, image } = req.body;
    const { uuid } = req.params;
    try {
      const gift = await prisma.gift.update({
        where: {
          uuid,
        },
        data: {
          name,
          description,
          url,
          image,
        },
      });
      return res.status(200).json(gift);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = giftsController;
