const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Log to file in production
const accessLogStream = process.env.NODE_ENV === 'production'
  ? fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' })
  : null;

const requestLogger = morgan(process.env.NODE_ENV === 'production' 
  ? ':remote-addr - :method :url :status :response-time ms'
  : 'dev', 
  { stream: accessLogStream }
);

/**
 * Custom error/event logger
 */
class Logger {
  static log(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${error.stack || error}\n`;
    
    // Write to error.log
    fs.appendFileSync(
      path.join(__dirname, '../../logs/error.log'),
      logMessage
    );
    
    // Also console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error(logMessage);
    }
  }
}

module.exports = {
  requestLogger,
  Logger
};
