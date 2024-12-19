import { Router } from "express";

import { authController } from "../controllers/auth.conroller";
import { commonMiddlewares } from "../middlewares/common.middlewares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-in",
  commonMiddlewares.validateBody(UserValidator.createUser),
  authController.signIn,
);
router.post("/sign-up", authController.signUp);

export const authRouter = router;
