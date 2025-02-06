import { v4 as uuidv4 } from "uuid";
import {
  comparePassword,
  currentDate,
  hashedPassword,
  signToken,
} from "../utils/helpers.js";
import { getUserByEmail, insertUser } from "../services/userService.js";
import ErrorHandler from "../errors/error.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new ErrorHandler(
        409,
        "Email already exists. Please provide other email"
      );
    }
    const id = uuidv4();
    const hashPassword = await hashedPassword(password);
    const token = signToken(email, id);
    const currentTimeStamp = currentDate();

    await insertUser(id, name, email, hashPassword, currentTimeStamp);

    res.status(201).json({
      message: "User was created successfully!",
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler(
        400,
        "Fields cannot be empty. Please fill all fields"
      );
    }
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ErrorHandler(
        404,
        "User with this email doesnt exist. Please provide correct email"
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new ErrorHandler(401, "Invalid email or password");
    }
    const token = signToken(user.email, user.id);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};
