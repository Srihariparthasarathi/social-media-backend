import { body, validationResult} from "express-validator";
import UserModel from "../../features/users/users.model.js";
import ApplicationError from "../applicationError.middleware.js";


const VALIDATION_FAIL_STATUS_CODE = 400;

const signupValidator = async (req, res, next)=>{
    //rules
    const rules = [
        body('username')
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers.')
        .notEmpty().withMessage('Username is required.')
        .trim() 
        .escape(),  
        body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail()
        .custom(value =>{
            const isEmailExists = UserModel.checkEmail(value);
            if(isEmailExists) throw new Error('A user already exists with this email address');
            return true;
        }),
        body('password')
        .notEmpty().withMessage('Email is required.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/).withMessage('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.')
        .escape()
    ]

    //runrules
    await Promise.all(rules.map((rule) => rule.run(req)));
    //handle execption
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
}

const signinValidator = async (req, res, next)=>{
    //rules
    const rules = [
        body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail()
       ,
        body('password')
        .notEmpty().withMessage('Password is required.')
        .escape()
    ]

    //runrules
    await Promise.all(rules.map((rule) => rule.run(req)));
    //handle execption
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
}



export { signinValidator, signupValidator };