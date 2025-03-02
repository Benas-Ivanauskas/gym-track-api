import dotenv from "dotenv";
dotenv.config();
import exporess from "express";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./config/logger.js";
import usersRouter from "./routes/users.js";
import exercisesRouter from "./routes/exercises.js";
import { authenticateUser } from "./middlewares/userAuth.js";

const app = exporess();

app.use(exporess.json());

app.use(logger.httpLogger());

app.use("/v1/api/", usersRouter);
app.use("/v1/api/", authenticateUser, exercisesRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
