import { Router } from "express";
import * as VideosController from "../controllers/videos.controller";
import { validate, validateParams } from "../middlwares/validate.middlware";
import {
  createVideoValidator,
  updateVideoValidator,
  idParamValidator,
} from "@vido-vala/validators";
import { authMiddleware } from "@/middlwares/auth.middlware";

const router: Router = Router();

router.get("/", VideosController.getAllVideos);
router.get("/:id", validateParams(idParamValidator), VideosController.getVideoById);
router.use(authMiddleware);
router.post("/", validate(createVideoValidator), VideosController.createVideo);
router.patch(
  "/:id",
  validateParams(idParamValidator),
  validate(updateVideoValidator),
  VideosController.updateVideo,
);
router.delete("/:id", validateParams(idParamValidator), VideosController.deleteVideo);

export default router;
