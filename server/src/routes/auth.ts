import express from "express";
import {body,validationResult} from "express-validator";
import User from "../models/user"

export const router = express.Router();

router.post(
    '/signup',
    body("email").isEmail().withMessage("The email is Invalid"),
    body("password").isLength({min:5}).withMessage("The Password is Invalid"),
    async(req,res)=>{

        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = validationErrors.array().map((error)=>{
                return{
                    msg:error.msg
                };
            });
            return res.json({errors, data:null});
        }

        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(user){
            return res.json({
                errors:[
                    {
                        msg: "Email already in use",
                    },
                ],
                data:null,
            });
        }

        res.json(user);
});

export default router;