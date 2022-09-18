import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "~/data";
import { decodedBasicToken } from "./services";
import "./model";

export const login = async (ctx) => {
  try {
    const [email, password] = decodedBasicToken(
      ctx.request.headers.authorization
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = "User not found";
      return;
    }

    // const passwordEqual = await bcrypt.compare(password, user.password);

    // if (!passwordEqual) {
    //   ctx.status = 404;
    //   ctx.body = "User or password is incorrect";
    //   return;
    // }

    const token = jwt.sign({ sub: user.id }, process.env.SECRET_KEY);

    ctx.body = { user, token };
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Ops! Something went wrong";
  }
};

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
    const saltRounds = 10;
    const { name, email, password } = ctx.request.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
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
