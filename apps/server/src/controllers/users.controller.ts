import type { RequestHandler } from "express";
import * as UserService from "../services/users.service";
import { sendResponse } from "../utils/response-handler";
import type { IdParam } from "@vido-vala/validators";

export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, 200, "Users retrieved successfully", { users });
};

export const getUserById: RequestHandler<IdParam> = async (req, res) => {
  const id = Number(req.params.id);
  const user = await UserService.getUserById(id);
  sendResponse(res, 200, "User retrieved successfully", { user });
};

export const getMe: RequestHandler = async (req, res) => {
  sendResponse(res, 200, "User profile retrieved successfully", { user: req.user });
};

export const updateMe: RequestHandler = async (req, res) => {
  const user = await UserService.updateUser(req.user.id, req.body);
  sendResponse(res, 200, "User updated successfully", { user });
};

export const deleteMe: RequestHandler = async (req, res) => {
  await UserService.deleteUser(req.user.id);
  sendResponse(res, 200, "User deleted successfully");
};
