// OM NAMASIVAYA
import { body, param, validationResult } from "express-validator";
import PostModel from "../../features/posts/posts.model.js";
import ApplicationError from "../applicationError.middleware.js";

const POST_NOT_FOUND = 'post not found with id:'
const VALIDATION_FAIL_STATUS_CODE = 400;
const profanityList = ["badword1", "badword2"]; 

const newCommentValidator = async (req, res, next) =>{
    const rules = [
        param('id')
        .isInt({ min: 1 }) 
        .withMessage('ID must be a positive integer')
        .custom((value) =>{
            const post = PostModel.getByPostId(value);
            if(!post) throw new Error(`${POST_NOT_FOUND} ${value}`);
            return true;
        }),
        body('content')
        .notEmpty()
        .withMessage("content can not be empty")
        .isString()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Content must be between 1 and 500 characters long')
        .custom((value) =>{
            if (profanityList.some(word => value.toLowerCase().includes(word))) {
                throw new Error("Caption contains prohibited words.");
            }
            return true;
        })

    ]

    
    await Promise.all(rules.map((rule)=> rule.run(req)));
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
};


const updateCommentValidator = async (req, res, next) =>{
    const rules = [
        param('id')
        .isInt({ min: 1 }) 
        .withMessage('ID must be a positive integer'),
        body('content')
        .notEmpty()
        .withMessage("content can not be empty")
        .isString()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Content must be between 1 and 500 characters long')
        .custom((value) =>{
            if (profanityList.some(word => value.toLowerCase().includes(word))) {
                throw new Error("Caption contains prohibited words.");
            }
            return true;
        })

    ]

    
    await Promise.all(rules.map((rule)=> rule.run(req)));
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
};


export { newCommentValidator, updateCommentValidator };