// OM NAMASIVIYA
import PostModel from "../../features/posts/posts.model.js";
import { param, validationResult } from "express-validator";
import ApplicationError from "../applicationError.middleware.js";

const POST_NOT_FOUND = "Please check the post ID and try again. No post found with ID:"
const VALIDATION_FAIL_STATUS_CODE = 400;

export default  async function checkPostExists(req, res, next){
    const rules = [
        param('id')
        .isInt({ min: 1 }) 
        .withMessage('ID must be a positive integer')
        .custom((value) =>{
            const post = PostModel.getByPostId(value);
            if(post) return true;
        }),
    ]

    
    await Promise.all(rules.map((rule)=> rule.run(req)));
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
}
