import jwt from "jsonwebtoken";

export const getToken = (data: Object) => {
  const secret = process.env.JWT_SECRET!;

  return jwt.sign(data, secret, {
    expiresIn: "3h",
  });
};
