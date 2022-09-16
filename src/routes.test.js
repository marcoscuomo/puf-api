import request from "supertest/";
import { app } from "./server-setup";

const server = app.listen();

describe("User Routes", () => {
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
});
