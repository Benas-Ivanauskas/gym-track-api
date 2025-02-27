import prisma from "../prisma/prismaClient.js";

export const getUserByEmail = (email) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const createUser = async (name, email, password) => {
  return prisma.users.create({
    data: { name, email, password },
  });
};

export const updateUserPassword = (id, email, password) => {
  return prisma.users.update({
    where: {
      id,
      email,
    },
    data: {
      password,
    },
  });
};
