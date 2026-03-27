import { Router } from "express";
import * as VideosController from "../controllers/videos.controller";
import { validate, validateParams } from "../middlwares/validate.middlware";
import {
  createVideoValidator,
  updateVideoValidator,
  idParamValidator,
  getUploadUrlValidator,
} from "@vido-vala/validators";
import { authMiddleware } from "@/middlwares/auth.middlware";

const router: Router = Router();

router.get("/", VideosController.getAllVideos);
router.use(authMiddleware);
router.post("/get-upload-url", validate(getUploadUrlValidator), VideosController.getUploadUrl);
router.get("/:id", validateParams(idParamValidator), VideosController.getVideoById);
router.post("/", validate(createVideoValidator), VideosController.createVideo);
router.patch(
  "/:id",
  validateParams(idParamValidator),
  validate(updateVideoValidator),
  VideosController.updateVideo,
);
router.delete("/:id", validateParams(idParamValidator), VideosController.deleteVideo);

export default router;
