import request from "supertest/";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "~/data";
import { app } from "./server-setup";

const server = app.listen();

describe("User Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  it("should return not found with wrong email", async () => {
    const email = "wrong@gmail.com";
    const password = "123456";

    const result = await request(server).get("/login").auth(email, password);

    expect(result.status).toBe(404);
  });

  it("should return not found with wrong passsword", async () => {
    const email = "marcos.souza.mob@atomlabs.com";
    const password = "wrong";

    const result = await request(server).get("/login").auth(email, password);

    expect(result.status).toBe(404);
  });

  it("should return logged with correct credentials", async () => {
    const email = "marcos.souza.mob2@atomlabs.com";
    const password = "123456";
    const name = "John Smith";

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { email, password: hashPassword, name },
    });

    const result = await request(server).get("/login").auth(email, password);
    const decodedToken = jwt.verify(result.body.token, process.env.SECRET_KEY);

    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
    expect(result.body.user.id).toBe(user.id);
    expect(result.body.user.name).toBeTruthy();
    // expect(result.body.user.password).toBeFalsy();

    expect(decodedToken.sub).toBe(user.id);
  });
});
