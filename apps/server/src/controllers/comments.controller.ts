import type { RequestHandler } from "express";
import * as CommentService from "../services/comments.service";
import { sendResponse } from "../utils/response-handler";
import type { IdParam, VideoIdParam } from "@vido-vala/validators";

export const addComment: RequestHandler = async (req, res) => {
  const comment = await CommentService.addComment(req.user.id, req.body);
  sendResponse(res, 201, "Comment added successfully", { comment });
};

export const getCommentsByVideoId: RequestHandler<VideoIdParam> = async (req, res) => {
  const videoId = Number(req.params.videoId);
  const comments = await CommentService.getCommentsByVideoId(videoId);
  sendResponse(res, 200, "Comments retrieved successfully", { comments });
};

export const updateComment: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  const comment = await CommentService.updateComment(id, req.user.id, req.body.content);
  sendResponse(res, 200, "Comment updated successfully", { comment });
};

export const deleteComment: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  await CommentService.deleteComment(id, req.user.id);
  sendResponse(res, 200, "Comment deleted successfully");
};
