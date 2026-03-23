import { Router } from "express";
import * as WatchHistoryController from "../controllers/watch-historie.controller";
import { validate, validateParams } from "../middlwares/validate.middlware";
import {
  createWatchHistoryValidator,
  updateWatchHistoryValidator,
  idParamValidator,
} from "@vido-vala/validators";

const router: Router = Router();

router.get("/me", WatchHistoryController.getMyWatchHistory);
router.post("/", validate(createWatchHistoryValidator), WatchHistoryController.addWatchHistory);
router.patch(
  "/:id",
  validateParams(idParamValidator),
  validate(updateWatchHistoryValidator),
  WatchHistoryController.addWatchHistory,
);
router.delete("/:id", validateParams(idParamValidator), WatchHistoryController.deleteWatchHistory);

export default router;
