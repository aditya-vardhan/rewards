const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'warn' : 'log';

const NO_OP = (message, ...optionalParams) => {};

/** Logger which outputs to the browser console */
class Logger {
  constructor(options) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    if (level === 'error') {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === 'warn') {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console);
  }
}

const logger = new Logger({ level: LOG_LEVEL });

export default logger;
