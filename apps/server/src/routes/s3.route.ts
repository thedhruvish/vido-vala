import { Router } from "express";
import * as s3Controller from "../controllers/s3.controller";
import { validate } from "@/middlwares/validate.middlware";
import { getUploadUrlValidator } from "@vido-vala/validators";

const router: Router = Router();

router.post("/", validate(getUploadUrlValidator), s3Controller.getUploadUrl);

export default router;
