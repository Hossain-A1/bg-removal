import jwt from "jsonwebtoken";
const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error("Token not found");
    }

    const decode = jwt.decode(token);

    req.body.clerkId = decode.clerkId;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export { isAuthorized };
