import { knex, db } from "../models/database.js";

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
      })
      .toQuery()
  );
};
