import validator from "validator";
import ErrorHandler from "../errors/error.js";
import { verifyToken } from "../utils/helpers.js";

export const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ErrorHandler(
      400,
      "Fields can't be empty. Please fill all fields"
    );
  }

  if (!validator.isEmail(email)) {
    throw new ErrorHandler(
      400,
      "Invalid email. Please provide a correct email"
    );
  }

  if (!validator.isStrongPassword(password)) {
    throw new ErrorHandler(
      400,
      "Invalid password. Please write a stronger password"
    );
  }

  next();
};

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req);

  if (!token) {
    throw new ErrorHandler(401, "Unauthorized. No token provided");
  }
  try {
    const decoded = verifyToken(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
