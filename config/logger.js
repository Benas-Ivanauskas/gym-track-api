import morgan from "morgan";
import chalk from "chalk";

class Logger {
  constructor() {}

  httpLogger() {
    return morgan("combined", { stream: process.stdout });
  }

  success(message) {
    console.log(chalk.green(`[INFO]: ${message}.`));
  }

  info(message) {
    console.log(chalk.blue(`[INFO]: ${message}.`));
  }

  error(message, status) {
    console.log(chalk.red(`[INFO]: ${message}. Status code [${status}]`));
  }

  warn(message, status) {
    console.log(chalk.yellow(`[INFO]: ${message}. Status code [${status}]`));
  }
}

export default new Logger();
