export const decodedBasicToken = (authHeader) => {
  const [, credentials] = authHeader.split(" ");

  const decoded = Buffer.from(credentials, "base64").toString();

  if (decoded.indexOf(":") === -1) {
    throw new Error("Wrong dredentials format");
  }

  return decoded.split(":");
};
