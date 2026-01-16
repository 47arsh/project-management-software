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

const userLoginValidator = () => {
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("enter valid email"),
        body("password")
            .notEmpty()
            .withMessage("password is required")    
    ]
}

const userChangedCurrentPasswordValidator = () => {
    return [
        body("oldPassword")
            .notEmpty()
            .withMessage("old password is required"),
        body("newPassword")
            .notEmpty()
            .withMessage("new password required")    
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("please enter a valid email address")
    ]
}

const userResetForgotPassword = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("password is required")
    ]
} 

export {userRegisterValidator , userLoginValidator, userChangedCurrentPasswordValidator , userForgotPasswordValidator, userResetForgotPassword}