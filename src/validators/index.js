import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("username required")
            .isLowercase()
            .withMessage("username must be lowercase")
            .isLength({min : 6})
            .withMessage("username must be atleast 6 character long"),    
        body("password")    
            .trim()
            .notEmpty()
            .withMessage("password is required"),
        body("fullname")
            .optional()
            .trim()
            .notEmpty()    
    ];
}