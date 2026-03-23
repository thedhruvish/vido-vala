import type { RequestHandler } from "express";
import * as WatchHistoryService from "../services/watch-historie.service";
import { sendResponse } from "../utils/response-handler";
import type { IdParam } from "@vido-vala/validators";

export const addWatchHistory: RequestHandler = async (req, res) => {
  const item = await WatchHistoryService.addWatchHistory(req.user.id, req.body);
  sendResponse(res, 201, "Watch history updated", { item });
};

export const getMyWatchHistory: RequestHandler = async (req, res) => {
  const history = await WatchHistoryService.getWatchHistory(req.user.id);
  sendResponse(res, 200, "Watch history retrieved", { history });
};

export const deleteWatchHistory: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  await WatchHistoryService.deleteWatchHistory(id);
  sendResponse(res, 200, "Watch history item deleted");
};
