import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import moment from "moment";
import validator from "validator";

export const hashedPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const signToken = (email, id, expiresIn) => {
  return JWT.sign({ email, id }, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });
};

export const currentDate = () => {
  return moment(Date.now()).format("YYYY-MM-DD");
};

export const comparePassword = (password, userPass) => {
  return bcrypt.compare(password, userPass);
};

export const verifyToken = (token, key) => {
  return JWT.verify(token, key);
};

export const isPassStrong = (password) => {
  return validator.isStrongPassword(password);
};
