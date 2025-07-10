import {Router} from "express";
import {sendEmailController} from "../controllers/email.controller";
import {validateEmail} from "../middlewares/validateEmail.middleware";
import {authenticate} from "../middlewares/authenticate.middleware";
import {rateLimitMiddleware} from "../middlewares/rateLimit.middleware";

const router = Router();

router.post(
    '/',
    authenticate,
    rateLimitMiddleware,
    validateEmail,
    async (req, res, next) => {
        try {
            await sendEmailController(req, res);
        } catch (error) {
            next(error);
        }
    }
)

export default router;