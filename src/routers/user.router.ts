import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.get("/:userId", userController.getById);
router.put("/:userId", userController.changeUser);
router.post("/", userController.create);
router.delete("/:userId", userController.delete);

export const userRouter = router;
