import  jwt  from "jsonwebtoken";
import ApplicationError from "./applicationError.middleware.js";
import config from "../../config.js"

const MISSING_TOKEN_MESSAGE = "Authentication token is missing. Please provide a valid token in the Authorization header.";
const INVALID_TOKEN_MESSAGE = "Invalid authentication token. Please provide a valid token.";
const UNAUTHORIZED_STATUS_CODE = 401;

export default jwtAuth = (req, res, next)=>{
    const token = req.headers["authorization"];

    if(!token) throw new ApplicationError(MISSING_TOKEN_MESSAGE, UNAUTHORIZED_STATUS_CODE);

    try {
        const  decoded = jwt.verify(token, config.jwtSecret);
        req.userId = decoded.userId;
    } catch(err) {
        throw new ApplicationError(INVALID_TOKEN_MESSAGE, UNAUTHORIZED_STATUS_CODE);
    }

    next();
    
}

