import { body, validationResult } from "express-validator";
import ApplicationError from "../applicationError.middleware.js";

const CAPTIONS_WORD_LIMIT = "Caption must be between 5 and 2200 characters.";
const CAPTION_IF_EMPTY = "Caption cannot be blank.";
const CAPTION_VALID_CHAR = "Caption must contain valid characters.";
const CAPTION_IF_PROFAINTY = "Caption contains prohibited words.";
const CAPTION_IF_HASHTAG_LIMIT_EXCEED = "Caption contains too many hashtags. Maximum allowed is 30.";
const CAPTION_IF_EMOJIS_LIMIT_EXCEED = "Caption contains too many emojis. Maximum allowed is 50.";
const CAPTION_IF_SPECIAL_SYMBOLE_LIMIT_EXCEED = "Caption contains too many special symbols."
const VALIDATION_FAIL_STATUS_CODE = 400;

const PROFANITYLIST = ["badword1", "badword2"]; 



export default class PostOrDraftValidation{
    #rules;
    constructor(feature, isOptional = false){
        this.isOptional = isOptional;
        this.feature = feature;
        this.#rules = [this.#validateCaptionRules(), this.#validateImage()];
    }

    async runValidationRules(req, res, next){

        await Promise.all(this.#rules.map((rule)=> rule.run(req)));
        const errors = validationResult(req);
        const errorDetails = errors.array().map(error => error.msg).join(', ');
        if (!errors.isEmpty()) return next(new ApplicationError(errorDetails, VALIDATION_FAIL_STATUS_CODE));
    
        next();
    }
    #validateCaptionRules(){
        const rule = body('caption');
    
        if(this.isOptional) rule.optional();
    
        return rule
        .isLength({ min: 5, max: 2200 })
        .withMessage(CAPTIONS_WORD_LIMIT)
        .trim()
        .notEmpty().withMessage(CAPTION_IF_EMPTY)
        .matches(/[a-zA-Z0-9]/).withMessage(CAPTION_VALID_CHAR)
        .custom((value) =>{
            if (PROFANITYLIST.some(word => value.toLowerCase().includes(word))) {
                throw new Error(CAPTION_IF_PROFAINTY);
            }
    
            const hashtags = value.match(/#[a-zA-Z0-9_]{1,50}/g) || [];
            if (hashtags.length > 30) {
                throw new Error(CAPTION_IF_HASHTAG_LIMIT_EXCEED);
            }
    
            const emojis = value.match(/\p{Emoji}/gu) || [];
            if (emojis.length > 50) {
                throw new Error(CAPTION_IF_EMOJIS_LIMIT_EXCEED);
            }
    
            const excessiveSymbols = value.match(/[^a-zA-Z0-9\s#@.,!?]/g) || [];
            if (excessiveSymbols.length > 100) {
                throw new Error(CAPTION_IF_SPECIAL_SYMBOLE_LIMIT_EXCEED);
            }
    
            return true;
        })
    }

    #validateImage(){
        const rule = body('image');
    
        if(this.isOptional) rule.optional();
        return rule
        .custom((value, {req}) =>{
            if(!req.file) throw new Error(`Oops Image require to create ${this.feature}, Please try again with uploding an image`);
            return true;
         })
    
    }
    
}

const draftValidator = (isOptional = false) =>{
    const draftValidator = new PostOrDraftValidation("draft", isOptional);
    return async function(req, res, next){
        await draftValidator.runValidationRules(req, res, next);
    }
}

const postValidator = (isOptional = false) =>{
    const postValidator = new PostOrDraftValidation("post", isOptional);
    return async function(req, res, next){
        await postValidator.runValidationRules(req, res, next);
    }
}

export { draftValidator, postValidator }

