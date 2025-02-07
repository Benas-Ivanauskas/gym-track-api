import { knex, db } from "../models/database.js";
import cron from "node-cron";

export const getUserByEmail = (email) => {
  return db.oneOrNone(
    knex("users").select("*").andWhere({ email: email }).limit(1).toQuery()
  );
};

export const insertUser = (id, name, email, hashPassword, currentDate) => {
  return db.none(
    knex("users")
      .insert({
        id: id,
        name: name,
        email: email,
        password: hashPassword,
        created_at: currentDate,
        updated_at: currentDate,
      })
      .toQuery()
  );
};

export const removeExpToken = (id) => {
  return db.none(
    knex("users")
      .where({ id })
      .update({
        reset_password_token: null,
        reset_password_expires: null,
        is_resetting_password: false,
      })
      .toQuery()
  );
};

export const removeExpiredTokens = async () => {
  console.log("Cleaning up expired reset tokens...");
  const now = new Date();
  await db.oneOrNone(
    knex("users")
      .where("reset_password_expires", "<", now)
      .update({
        reset_password_token: null,
        reset_password_expires: null,
        is_resetting_password: false,
      })
      .toQuery()
  );
  console.log("Expired tokens cleaned up!");
};

cron.schedule("*/6 * * * *", async () => {
  await removeExpiredTokens();
});

export const storeResetToken = (id, token, expTime) => {
  return db.oneOrNone(
    knex("users")
      .andWhere({ id })
      .update({
        reset_password_token: token,
        reset_password_expires: expTime,
        is_resetting_password: true,
      })
      .toQuery()
  );
};

export const updateUserPassword = (
  id,
  email,
  hashPassword,
  currentTimeStamp
) => {
  return db.none(
    knex("users")
      .andWhere({ id: id, email: email })
      .update({
        password: hashPassword,
        updated_at: currentTimeStamp,
        reset_password_token: null,
        reset_password_expires: null,
        is_resetting_password: false,
      })
      .toQuery()
  );
};
