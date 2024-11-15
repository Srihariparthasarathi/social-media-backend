import { body, validationResult } from "express-validator";

const VALIDATION_FAIL_STATUS_CODE = 400;
const profanityList = ["badword1", "badword2"]; 

const postValidator = async (req, res, next)=>{
    const rules = [
        body('caption')
        .isLength({ min: 5, max: 2200 })
        .withMessage("Caption must be between 5 and 2200 characters.")
        .trim()
        .notEmpty().withMessage("Caption cannot be blank.")
        .matches(/[a-zA-Z0-9]/).withMessage("Caption must contain valid characters.")
        .custom((value) =>{
            if (profanityList.some(word => value.toLowerCase().includes(word))) {
                throw new Error("Caption contains prohibited words.");
            }

            const hashtags = value.match(/#[a-zA-Z0-9_]{1,50}/g) || [];
            if (hashtags.length > 30) {
                throw new Error("Caption contains too many hashtags. Maximum allowed is 30.");
            }

            const emojis = value.match(/\p{Emoji}/gu) || [];
            if (emojis.length > 50) {
                throw new Error("Caption contains too many emojis. Maximum allowed is 50.");
            }

            const excessiveSymbols = value.match(/[^a-zA-Z0-9\s#@.,!?]/g) || [];
            if (excessiveSymbols.length > 100) {
                throw new Error("Caption contains too many special symbols.");
            }

            return true;
        }),
    ]

    await Promise.all(rules.map((rule)=> rule.run(req)));
    const errors = validationResult(req);
    const errorDetails = errors.array().map(error => error.msg).join(', ');
    if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));

    next();
}

export { postValidator };