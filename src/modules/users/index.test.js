import { decodedBasicToken } from "./";

describe("User Module", () => {
  it("should return credentials by basic authentication token", () => {
    const credentials = {
      email: "johndoe@gmail.com",
      password: "123456",
    };
    const token = Buffer.from(
      `${credentials.email}:${credentials.password}`,
      "utf8"
    ).toString("base64");
    const basicToken = `Basic ${token}`;

    const result = decodedBasicToken(basicToken);

    expect(result).toEqual([credentials.email, credentials.password]);
  });
});
