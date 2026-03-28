import { sendResponse } from "@/utils/response-handler";
import { UPLOAD_TYPE } from "@vido-vala/validators";
import type { RequestHandler } from "express";
import path from "node:path";

export const getUploadUrl: RequestHandler = async (req, res) => {
  const userId = req.user.id;
  const fileId = `file-${Math.random().toString(36).substring(7)}`;

  const extension = path.extname(req.body.fileName);
  const uploadType = req.body.type;
  let key;
  if (uploadType === UPLOAD_TYPE[0]) {
    key = "/ROW";
  } else if (uploadType == UPLOAD_TYPE[1]) {
    key = "/THUMBNAIL";
  }

  key = `${key}/${userId}-${fileId}${extension}`;

  const uploadUrl = Bun.s3.presign(key, {
    expiresIn: 3600,
    method: "PUT",
    type: req.body.contentType,
  });

  sendResponse(res, 200, "Upload URL generated successfully", {
    uploadUrl,
    key,
  });
};
