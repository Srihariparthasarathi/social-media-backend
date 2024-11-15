
import winston from "winston"

const INFO_LOG_DATE_FORMAT = new Date().toString();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log', level: 'info',silent: true,}),
    ],
  });

export default class Loggers{

    requestLogger(req, res, next){
        if(!req.url.includes("signin") && !req.url.includes("signup")){
            logger.log(
                {
                    level: "info",
                    message: `\n${INFO_LOG_DATE_FORMAT} 
                    \n${req.body}`
                }
            )
        }
        next();
    }

    applicationErrorLog(errMessage, url, stack){
        logger.log(
            {
                level: "error",
                message: `${INFO_LOG_DATE_FORMAT}, errormessage: ${errMessage}, url: ${url}, stack: ${stack} `
            }
        )
    }

}