import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddlewares } from "../middlewares/common.middlewares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.get(
  "/:userId",
  commonMiddlewares.isIdValid("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddlewares.isIdValid("userId"),
  commonMiddlewares.validateBody(UserValidator.updateUser),
  userController.changeUser,
);
router.post(
  "/",
  commonMiddlewares.validateBody(UserValidator.createUser),
  userController.create,
);
router.delete(
  "/:userId",
  commonMiddlewares.isIdValid("userId"),
  userController.delete,
);

export const userRouter = router;
