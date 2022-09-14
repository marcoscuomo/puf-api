import { prisma } from "~/data";

export const list = async (ctx) => {
  try {
    const users = await prisma.user.findMany();
    ctx.body = users;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Ops! Something went wrong";
  }
};

export const create = async (ctx) => {
  try {
    const user = await prisma.user.create({
      data: ctx.request.body,
    });

    ctx.body = user;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Ops! Something went wrong";
  }
};

export const update = async (ctx) => {
  try {
    const { name, email } = ctx.request.body;

    const user = await prisma.user.update({
      where: { id: ctx.params.id },
      data: {
        name,
        email,
      },
    });
    ctx.body = user;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Ops! Something went wrong";
  }
};

export const remove = async (ctx) => {
  try {
    await prisma.user.delete({
      where: { id: ctx.params.id },
    });
    ctx.body = { id: ctx.params.id };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Ops! Something went wrong";
  }
};
