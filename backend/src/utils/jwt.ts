import jwt from "jsonwebtoken";
import ms from "ms";

export const generateToken = (
  data: string | Buffer | object,
  JWT_KEY: jwt.Secret | jwt.PrivateKey,
  expiresIn: number | ms.StringValue | undefined = "1h"
) => jwt.sign(data, JWT_KEY, { expiresIn });
