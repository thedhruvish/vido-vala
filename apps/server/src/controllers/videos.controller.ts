import type { RequestHandler } from "express";
import * as VideoService from "../services/videos.service";
import { sendResponse } from "../utils/response-handler";
import type { IdParam } from "@vido-vala/validators";

export const createVideo: RequestHandler = async (req, res) => {
  const video = await VideoService.createVideo(req.user.id, req.body);
  sendResponse(res, 201, "Video created successfully", { video });
};

export const getAllVideos: RequestHandler = async (_req, res) => {
  const videos = await VideoService.getAllVideos();
  sendResponse(res, 200, "Videos retrieved successfully", { videos });
};

export const getVideoById: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  const video = await VideoService.getVideoById(id);
  sendResponse(res, 200, "Video retrieved successfully", { video });
};

export const updateVideo: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  const video = await VideoService.updateVideo(id, req.user.id, req.body);
  sendResponse(res, 200, "Video updated successfully", { video });
};

export const deleteVideo: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  await VideoService.deleteVideo(id, req.user.id);
  sendResponse(res, 200, "Video deleted successfully");
};
