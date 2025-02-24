import ErrorHandler from "../errors/error.js";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack.split("\n")[1].trim());
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error, please try again later",
  });
};

export default errorHandler;
