import dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./config/logger.js";
import usersRouter from "./routes/users.js";
import exercisesRouter from "./routes/exercises.js";
import { authenticateUser } from "./middlewares/userAuth.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(logger.httpLogger());

app.use("/v1/api/", usersRouter);
app.use("/v1/api/", exercisesRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
