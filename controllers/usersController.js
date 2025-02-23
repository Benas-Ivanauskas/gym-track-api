import { v4 as uuidv4 } from "uuid";
import {
  comparePassword,
  currentDate,
  hashedPassword,
  isPassStrong,
  signToken,
  verifyToken,
} from "../utils/helpers.js";
import {
  getUserByEmail,
  insertUser,
  updateUserPassword,
} from "../services/userService.js";
import ErrorHandler from "../errors/error.js";
import { sendPasswordResetEmail } from "../mailer.js";
import redis from "../models/redis.js";
import logger from "../config/logger.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      logger.error("Email already exists", 409);
      throw new ErrorHandler(
        409,
        "Email already exists. Please provide other email"
      );
    }
    const id = uuidv4();
    const hashPassword = await hashedPassword(password);
    const token = signToken(email, id, "1h");
    const currentTimeStamp = currentDate();

    await insertUser(id, name, email, hashPassword, currentTimeStamp);

    res.status(201).json({
      message: "User was created successfully!",
      token,
    });

    logger.success(
      `User was Successfully created. User:${JSON.stringify({
        id,
        name,
        email,
        password: hashPassword,
        timestamp: currentTimeStamp,
      })}`
    );
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      logger.error("Fields cannot be empty", 400);
      throw new ErrorHandler(
        400,
        "Fields cannot be empty. Please fill all fields"
      );
    }
    const user = await getUserByEmail(email);
    if (!user) {
      logger.error("User with this email doesnt exist", 404);
      throw new ErrorHandler(
        404,
        "User with this email doesnt exist. Please provide correct email"
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      logger.error("Invalid email or password", 401);
      throw new ErrorHandler(401, "Invalid email or password");
    }
    const token = signToken(user.email, user.id, "1h");

    res.status(200).json({
      message: "Login successful",
      token,
    });
    logger.success(`User successfully loged in. User:${JSON.stringify(user)}`);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      logger.error("Email fields is empty", 400);
      throw new ErrorHandler(400, "Email fields is empty. Please fill field");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      logger.error("Email does not exist", 404);
      throw new ErrorHandler(
        404,
        "Email does not exist. Please provide correct email adress"
      );
    }
    const { id } = user;
    const tempToken = signToken(email, id, "5m");

    await redis.setex(`reset_password_token_${id}`, 5 * 60, tempToken);
    const resetLink = `${process.env.FRONTED_URL}/v1/api/reset-password?token=${tempToken}`;

    try {
      await sendPasswordResetEmail(user?.email, resetLink);
      res
        .status(200)
        .json({ message: "Password reset link has been sent to your email" });
    } catch (emailErr) {
      throw new ErrorHandler(
        500,
        "Failed to send reset email. Please try again later."
      );
    }
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password } = req.body;

    if (!token || !password) {
      logger.error("Token are required", 400);
      throw new ErrorHandler(400, "Token are required.");
    }
    if (!password) {
      logger.error("Password field cannot be empty", 400);
      throw new ErrorHandler(
        400,
        "Password field cannot be empty. Please provide password"
      );
    }
    const checkingPassword = isPassStrong(password);
    if (!checkingPassword) {
      logger.error(
        "Password is not strong enough. Please write stronger password",
        400
      );
      throw new ErrorHandler(
        400,
        "Password is not strong enough. Please write stronger password"
      );
    }
    const decoded = verifyToken(token, process.env.SECRET_KEY);
    const { email, id } = decoded;

    const tokenInRedis = await redis.get(`reset_password_token_${id}`);
    if (!tokenInRedis || tokenInRedis !== token) {
      logger.error("This reset token has expired or is invalid", 400);
      throw new ErrorHandler(
        400,
        "This reset token has expired or is invalid."
      );
    }

    const user = await getUserByEmail(email);
    if (!user || user.id !== id) {
      throw new ErrorHandler(401, "Invalid token or user not found.");
    }

    const hashPassword = await hashedPassword(password);
    const currentTimeStamp = currentDate();
    await updateUserPassword(id, email, hashPassword, currentTimeStamp);

    await redis.del(`reset_password_token_${id}`);

    res.status(200).json({
      message: `User with ${email} was successfully updated password`,
    });
    logger.success(`User with ${email} was successfully updated password`);
  } catch (err) {
    next(err);
  }
};

export const getResetLink = (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    throw new ErrorHandler(400, "Invalid or missing token");
  }
  try {
    return res
      .status(200)
      .send(`This is the route where user need to change password`);
  } catch (err) {
    next(err);
  }
};
