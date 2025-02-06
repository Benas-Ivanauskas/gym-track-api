import exporess from "express";
import usersRouter from "./routes/users.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = exporess();

app.use(exporess.json());

app.use("/v1/api/", usersRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
