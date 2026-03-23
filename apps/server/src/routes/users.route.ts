import { Router } from "express";
import * as UsersController from "../controllers/users.controller";
import { validate, validateParams } from "../middlwares/validate.middlware";
import { updateUserValidator, idParamValidator } from "@vido-vala/validators";

const router: Router = Router();

router.get("/", UsersController.getAllUsers);
router.get("/me", UsersController.getMe);
router.get("/:id", validateParams(idParamValidator), UsersController.getUserById);
router.patch("/me", validate(updateUserValidator), UsersController.updateMe);
router.delete("/me", UsersController.deleteMe);

export default router;
