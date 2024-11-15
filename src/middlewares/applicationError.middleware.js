import Loggers from "./logger.middleware.js"

const SERVER_ERROR_MESSAGE = "We're currently experiencing technical difficulties. Please try again later.";
const SERVER_ERROR_STATUS_CODE = 500;
const NOT_FOUND_MESSAGE = "The requested API was not found on this server. Please check the address and try again.";
const NOT_FOUND_STATUS_CODE = 404;

const logger = new Loggers();

export default class ApplicationError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err){
        if(err instanceof ApplicationError) return res.status(err.statusCode).json({error : err.message});
        logger.applicationErrorLog(err.message, req.path, err.stack);
        return res.status(SERVER_ERROR_STATUS_CODE).json({error : SERVER_ERROR_MESSAGE});
    }
    next();
}

export const urlNotExistMiddlerare = (req, res)=>{
    return res.status(NOT_FOUND_STATUS_CODE).json({error : NOT_FOUND_MESSAGE});
}