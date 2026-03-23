import { Router } from "express";
import * as CommentsController from "../controllers/comments.controller";
import { validate, validateParams } from "../middlwares/validate.middlware";
import {
  createCommentValidator,
  updateCommentValidator,
  idParamValidator,
  videoIdParamValidator,
} from "@vido-vala/validators";

const router: Router = Router();

router.get(
  "/video/:videoId",
  validateParams(videoIdParamValidator),
  CommentsController.getCommentsByVideoId,
);
router.post("/", validate(createCommentValidator), CommentsController.addComment);
router.patch(
  "/:id",
  validateParams(idParamValidator),
  validate(updateCommentValidator),
  CommentsController.updateComment,
);
router.delete("/:id", validateParams(idParamValidator), CommentsController.deleteComment);

export default router;
