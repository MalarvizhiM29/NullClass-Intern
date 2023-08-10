
import express from "express";
import {body,validationResult} from "express-validator";

export const router = express.Router();

router.post(
    '/signup',
    body("email").isEmail(),
    body("password").isLength({min:5}),
    async(req,res)=>{

        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = validationErrors.array().map((error)=>{
                return{
                    msg:error.msg
                };
            });
            return res.json({errors});
        }
        const {email,password} = req.body;
        res.json({
            email,
            password
        });
});

export default router;