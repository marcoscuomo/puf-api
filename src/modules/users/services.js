class CredentialsFormatError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export const decodedBasicToken = (authHeader) => {
  const [, credentials] = authHeader.split(" ");

  const decoded = Buffer.from(credentials, "base64").toString();

  if (decoded.indexOf(":") === -1) {
    throw new CredentialsFormatError("Wrong dredentials format");
  }

  return decoded.split(":");
};
