import {Router,RequestHandler,Response,Request, NextFunction} from 'express';
import { body, validationResult } from 'express-validator';
export default class AuthenticationController {
    private router = Router();

    registerRoute():Router {
        this.router.post("/login",this.loginValidationRules(),this.validate, this.login())
        return this.router;
    }
    private login():RequestHandler {
        return async (req:Request,res:Response) => {
            return res.status(200).json({message:'a'})
        }
    }
    private loginValidationRules = () => {
        return [
            body('email').exists().withMessage('Email is required'),
            body('password').exists().withMessage('Password is required')
        ]
    }
    private validate = (req:Request,res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json(errors);
    }
}